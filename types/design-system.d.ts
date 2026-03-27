// Ambient type declaration for the universe-built @databricks/design-system.
// The compiled dist/ doesn't ship .d.ts files and the source types require
// Emotion's JSX transform to type-check correctly. This wildcard declaration
// lets TypeScript treat all DS imports as `any`, which is fine for prototyping.
declare module '@databricks/design-system';
declare module '@databricks/design-system/*';
