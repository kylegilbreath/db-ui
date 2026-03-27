#!/usr/bin/env bash
set -euo pipefail

# ─── 1. Check that Databricks CLI is installed ───
if ! command -v databricks &>/dev/null; then
  echo "ERROR: Databricks CLI is not installed."
  echo ""
  echo "Install it with:"
  echo "  curl -fsSL https://raw.githubusercontent.com/databricks/setup-cli/main/install.sh | sh"
  echo ""
  echo "Then authenticate:"
  echo "  databricks configure"
  exit 1
fi

# ─── 2. Check that the CLI is authenticated ───
# Use --profile flag if DATABRICKS_PROFILE is set, otherwise use default
PROFILE_FLAG=""
if [ -n "${DATABRICKS_PROFILE:-}" ]; then
  PROFILE_FLAG="--profile $DATABRICKS_PROFILE"
fi

AUTH_ERROR=$(databricks workspace list / $PROFILE_FLAG 2>&1) || {
  if echo "$AUTH_ERROR" | grep -q "does not have required scopes"; then
    echo "ERROR: Your PAT token does not have the required scopes."
    echo ""
    echo "Either:"
    echo "  1. Generate a new PAT with 'workspace' and 'scim' scopes in your Databricks workspace"
    echo "     (User Settings → Developer → Access Tokens)"
    echo ""
    echo "  2. Use OAuth instead (recommended):"
    echo "     databricks auth login --host <your-workspace-url>"
    echo "     Then re-run with: DATABRICKS_PROFILE=<profile-name> npm run deploy"
  else
    echo "ERROR: Databricks CLI is not authenticated."
    echo ""
    echo "Run one of the following to set up your credentials:"
    echo "  Option 1 (OAuth — recommended):"
    echo "    databricks auth login --host <your-workspace-url>"
    echo ""
    echo "  Option 2 (PAT token):"
    echo "    databricks configure"
    echo "    (Make sure your token has 'workspace' and 'scim' scopes)"
  fi
  exit 1
}

# ─── 3. Get the current user ───
USER_EMAIL=$(databricks current-user me $PROFILE_FLAG --output json 2>/dev/null | python3 -c "import sys,json; print(json.load(sys.stdin)['userName'])")
if [ -z "$USER_EMAIL" ]; then
  echo "ERROR: Could not determine your Databricks username."
  echo "Your token may be missing the 'scim' scope."
  echo ""
  echo "Use OAuth instead (handles scopes automatically):"
  echo "  databricks auth login --host <your-workspace-url>"
  exit 1
fi
# Derive a short username from the email (everything before @)
USERNAME=$(echo "$USER_EMAIL" | cut -d'@' -f1 | tr '.' '-')

echo "Deploying as: $USER_EMAIL ($USERNAME)"

# ─── 4. Derive app name from git branch ───
BRANCH=$(git rev-parse --abbrev-ref HEAD)
# Sanitize: lowercase, replace non-alphanumeric with hyphens, trim hyphens
SAFE_BRANCH=$(echo "$BRANCH" | tr '[:upper:]' '[:lower:]' | sed 's/[^a-z0-9-]/-/g' | sed 's/--*/-/g' | sed 's/^-//;s/-$//')
APP_NAME="proto-${USERNAME}-${SAFE_BRANCH}"

# Databricks app names have a 30-char limit
APP_NAME="${APP_NAME:0:30}"
# Trim trailing hyphens after truncation
APP_NAME=$(echo "$APP_NAME" | sed 's/-*$//')

WORKSPACE_PATH="/Workspace/Users/${USER_EMAIL}/deploys/${APP_NAME}"

echo "App name:       $APP_NAME"
echo "Workspace path: $WORKSPACE_PATH"
echo ""

# ─── 5. Build the app ───
echo "Building..."
npm run build

# ─── 6. Sync files to workspace ───
echo ""
echo "Syncing files to workspace..."
databricks workspace mkdirs "$WORKSPACE_PATH" $PROFILE_FLAG 2>/dev/null || true
databricks sync . "$WORKSPACE_PATH" --full --watch $PROFILE_FLAG &
SYNC_PID=$!
sleep 15
kill $SYNC_PID 2>/dev/null || true

# ─── 7. Create app if it doesn't exist ───
if ! databricks apps get "$APP_NAME" $PROFILE_FLAG &>/dev/null; then
  echo ""
  echo "Creating app: $APP_NAME"
  databricks apps create "$APP_NAME" $PROFILE_FLAG \
    --description "Prototype deploy: $BRANCH (by $USER_EMAIL)" \
    --no-wait

  # Wait for compute to spin up
  echo "Waiting for app compute..."
  for i in $(seq 1 40); do
    STATE=$(databricks apps get "$APP_NAME" $PROFILE_FLAG 2>/dev/null | python3 -c "import sys,json; print(json.load(sys.stdin).get('compute_status',{}).get('state','UNKNOWN'))" 2>/dev/null || echo "UNKNOWN")
    if [ "$STATE" = "ACTIVE" ]; then
      echo "Compute ready."
      break
    fi
    printf "  (%d/40) state: %s\n" "$i" "$STATE"
    sleep 15
  done
else
  # App exists — check if compute is stopped and start it
  COMPUTE_STATE=$(databricks apps get "$APP_NAME" $PROFILE_FLAG --output json 2>/dev/null | python3 -c "import sys,json; print(json.load(sys.stdin).get('compute_status',{}).get('state','UNKNOWN'))" 2>/dev/null || echo "UNKNOWN")
  if [ "$COMPUTE_STATE" != "ACTIVE" ]; then
    echo ""
    echo "App compute is $COMPUTE_STATE — starting it..."
    databricks apps start "$APP_NAME" $PROFILE_FLAG --no-wait

    echo "Waiting for app compute..."
    for i in $(seq 1 40); do
      STATE=$(databricks apps get "$APP_NAME" $PROFILE_FLAG --output json 2>/dev/null | python3 -c "import sys,json; print(json.load(sys.stdin).get('compute_status',{}).get('state','UNKNOWN'))" 2>/dev/null || echo "UNKNOWN")
      if [ "$STATE" = "ACTIVE" ]; then
        echo "Compute ready."
        break
      fi
      printf "  (%d/40) state: %s\n" "$i" "$STATE"
      sleep 15
    done
  fi
fi

# ─── 8. Deploy ───
echo ""
echo "Deploying..."
databricks apps deploy "$APP_NAME" $PROFILE_FLAG \
  --source-code-path "$WORKSPACE_PATH" \
  --no-wait

# Wait for deployment
echo "Waiting for deployment to finish..."
for i in $(seq 1 40); do
  RESULT=$(databricks apps get "$APP_NAME" $PROFILE_FLAG 2>/dev/null | python3 -c "
import sys, json
d = json.load(sys.stdin)
dep = d.get('active_deployment', {}).get('status', {})
print(dep.get('state', 'UNKNOWN'), dep.get('message', ''))
" 2>/dev/null || echo "UNKNOWN")
  STATE=$(echo "$RESULT" | awk '{print $1}')

  if [ "$STATE" = "SUCCEEDED" ]; then
    break
  elif [ "$STATE" = "FAILED" ]; then
    echo "Deployment failed!"
    databricks apps logs "$APP_NAME" $PROFILE_FLAG 2>&1 | tail -30
    exit 1
  fi
  printf "  (%d/40) %s\n" "$i" "$RESULT"
  sleep 15
done

# ─── 9. Print the URL ───
APP_URL=$(databricks apps get "$APP_NAME" $PROFILE_FLAG 2>/dev/null | python3 -c "import sys,json; print(json.load(sys.stdin).get('url','(URL not available)'))")
echo ""
echo "=========================================="
echo "  Deployed successfully!"
echo "  $APP_URL"
echo "=========================================="
