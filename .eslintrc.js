module.exports = {
  root: true,
  env: {
    node: true,
    jest: true
  },
  'extends': [
    "plugin:vue/recommended",
    "@vue/airbnb",
    "@vue/typescript",
  ],
  plugins: [
    'vuefix',
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "max-len": ["warn", {
      "code": 120,
      "tabWidth": 2,
      "ignoreComments": true,
      "ignoreTemplateLiterals": true,
      "ignoreUrls": true,
      "ignoreStrings": true,
    }],
    "no-case-declarations": "off",
    "global-require": "off",
    "import/no-dynamic-require": "off",
    "no-param-reassign": ["error", { "props": false }],
    "no-multi-spaces": ["warn"],
    "import/no-unresolved": "off",
    "import/no-cycle": "off",
    "import/extensions": "off",
    "consistent-return": "off",
    "class-methods-use-this": "off",
    "space-before-blocks": ["warn"],
    "arrow-parens": ["error", "as-needed"],
    "array-bracket-spacing": ["warn"],
    "block-spacing": ["warn"],
    "key-spacing": ["warn"],
    "keyword-spacing": ["warn"],
    "no-restricted-globals": "off",
    "vue/no-v-html": "off",
    "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
    "prefer-promise-reject-errors": "off",
    "no-underscore-dangle":"off",
    "linebreak-style": [0 ,"error", "windows"], // 允许windows开发环境
    "vuefix/vuefix": [2, {"auto": true}],
    "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 1 }]
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  overrides: [
    {
      "files": ["*.d.ts"],
      "rules": {
        "no-unused-vars": "off",
        "import/prefer-default-export": "off",
      }
    }
  ],
  globals: {
    "wrapper": "readonly",
    "BestpayHtml5": "readonly",
    "sa": "readonly"
  }
}
