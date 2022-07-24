module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ['google'],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'new-cap': 'off',
    'linebreak-style': 'off',
    'require-jsdoc': 'off',
  },
};
