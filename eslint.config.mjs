import { defineConfig, globalIgnores } from "eslint/config";
import eslint from "@eslint/js";
import globals from "globals";

export default defineConfig([
  globalIgnores([
    "node_modules",
    ".cache/**", // 根目录下的 .cache
    "**/dist/**",
    "**/dist-ssr/**",
    "**/coverage/**",
    "pnpm-lock.yaml",
    "CHANGELOG.en-US.md",
    "**/components.d.ts",
    "**/auto-imports.d.ts",
    "coverage",
    "play",
    "ssr-testing/cases/*",
    "!.*",
    "apps/web/src/assets/style/font/iconfont.js",
  ]),
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.es2025,
        ...globals.node,
      },
    },
  },
  eslint.configs.recommended,
]);
