import { createESLintConfig } from "@the-rabbit-hole/eslint-config";

export default [
  { ignores: ["src/astrometry/constellations/data.ts"] },
  ...createESLintConfig({
    disableExtends: ["eslintReact", "eslintA11y", "eslintStorybook"],
  }),
];
