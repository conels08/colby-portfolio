import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

let tailwindcssPlugin;
try {
  tailwindcssPlugin = (await import("eslint-plugin-tailwindcss")).default;
} catch {
  tailwindcssPlugin = undefined;
}

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    plugins: tailwindcssPlugin ? { tailwindcss: tailwindcssPlugin } : {},
    rules: {
      ...(tailwindcssPlugin
        ? {
            "tailwindcss/no-unnecessary-arbitrary-value": "off",
            "tailwindcss/enforces-shorthand": "off",
          }
        : {}),
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  // Keep this as the final rules layer so it overrides all prior presets.
  {
    rules: {
      "react/no-unescaped-entities": "off",
    },
  },
]);

export default eslintConfig;
