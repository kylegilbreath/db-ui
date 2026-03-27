const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  // No longer needed — we resolve directly to pre-compiled dist/
  // transpilePackages: ['@databricks/design-system'],
  webpack: (config) => {
    const dsPath = path.dirname(require.resolve('@databricks/design-system/package.json'));

    // Force resolution to compiled dist instead of source TypeScript.
    config.resolve.alias['@databricks/design-system$'] =
      path.join(dsPath, 'dist/index.js');
    config.resolve.alias['@databricks/design-system/development'] =
      path.join(dsPath, 'dist/development.js');

    // The universe DS uses a patched Radix tooltip alias.
    // Redirect it to the standard npm package.
    config.resolve.alias['@radix-ui/react-tooltip-patch'] =
      require.resolve('@radix-ui/react-tooltip');

    return config;
  },
}

module.exports = nextConfig
