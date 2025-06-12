import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    //*
    // The react/no-unescaped-entities ESLint rule flags unescaped characters within JSX,
    // such as quotes (" or '), greater than signs (>), and curly braces (}). 
    // It aims to prevent potential rendering issues and ensure code correctness. 
    // This rule is triggered because JSX treats these characters as special syntax elements.
    //  */
    rules: {
      "react/no-unescaped-entities": "off"
    }
  }
];

export default eslintConfig;
