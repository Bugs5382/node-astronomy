import { createESLintConfig } from "@the-rabbit-hole/eslint-config";

export default createESLintConfig({
  disableExtends: ["eslintReact", "eslintA11y", "eslintStorybook"],
});
