import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Interactive 3D page (M6-S04): plain browser JS bundled by scripts/build-real-cost.mjs, and its built file.
    "tools/real-cost/**",
    "public/real-cost/**",
  ]),
]);

export default eslintConfig;
