module.exports = {
  env: {
    es2021: true,
  },
  extends: ["eslint: recommended", "plugin:react/recommended", "airbnb-base"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "no-underscore-dangle": ["error", { allow: ["_id"] }],
  },
};
