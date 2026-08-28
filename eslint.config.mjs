import coreWebVitals from "eslint-config-next/core-web-vitals";
import typescriptConfig from "eslint-config-next/typescript";

/**
 * Flat config. eslint-config-next 16 exports ready-made flat config arrays as
 * CommonJS default exports, so they spread directly, with no FlatCompat shim.
 */
export default [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "next-env.d.ts",
      "public/**",
      "eslint.config.mjs",
    ],
  },
  ...coreWebVitals,
  ...typescriptConfig,
  {
    rules: {
      // Unused imports and dead references were how several stale bits survived
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
];
