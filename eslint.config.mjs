import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
    {
        ignores: [
            "dist/",
            "out/",
            "node_modules/",
        ],
    },
    js.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    {
        languageOptions: {
            parserOptions: {
                projectService: {
                    allowDefaultProject: ["eslint.config.mjs"],
                },
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: {
            // Match existing code style
            "no-console": "error",
            eqeqeq: ["error", "smart"],
            curly: "error",

            // TypeScript rules matching the original config
            "@typescript-eslint/explicit-function-return-type": ["error", { allowExpressions: true }],
            "@typescript-eslint/no-floating-promises": "error",
            "@typescript-eslint/no-inferrable-types": ["error", { ignoreParameters: true }],
            "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
            "@typescript-eslint/no-require-imports": "error",

            // Relax rules that conflict with existing code patterns
            "@typescript-eslint/no-base-to-string": "off",
            "@typescript-eslint/no-unsafe-argument": "off",
            "@typescript-eslint/no-unsafe-assignment": "off",
            "@typescript-eslint/no-unsafe-call": "off",
            "@typescript-eslint/no-unsafe-member-access": "off",
            "@typescript-eslint/no-unsafe-return": "off",
        },
    },
);
