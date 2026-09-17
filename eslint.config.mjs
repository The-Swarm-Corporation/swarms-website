import next from "@next/eslint-plugin-next"
import tsParser from "@typescript-eslint/parser"

// Flat config: Next 16 dropped `next lint`, so the Next rules are wired up
// directly instead of through the old `eslint-config-next` shareable config.
export default [
  {
    ignores: [".next/**", "node_modules/**", "public/**", "next-env.d.ts"],
  },
  {
    files: ["**/*.{js,mjs,jsx,ts,tsx}"],
    // Only the Next rules run here, so disable directives aimed at core ESLint
    // rules (which this config does not enable) are not flagged as unused.
    linterOptions: { reportUnusedDisableDirectives: "off" },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: { "@next/next": next },
    rules: {
      ...next.configs.recommended.rules,
      ...next.configs["core-web-vitals"].rules,
    },
  },
]
