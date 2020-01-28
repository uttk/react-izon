module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: ["plugin:react/recommended", "airbnb"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.lib.json"]
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".json", ".ts", ".tsx"]
      }
    }
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "import/prefer-default-export": "off",
    "react/jsx-filename-extension": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "semi": ["error", "always"],
    "react/prop-types": "off"
  }
};
