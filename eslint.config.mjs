import { defineConfig } from "eslint/config";
import eslint from "@eslint/js";
import globals from "globals";

export default defineConfig([
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
