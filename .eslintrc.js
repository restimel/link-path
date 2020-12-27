module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
    },
    'extends': [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
    ],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
    },
    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'indent': ['error', 4, { 'SwitchCase': 1 }],
        'comma-dangle': ['error', 'always-multiline'],
        'semi': ['error', 'always'],
        'space-before-function-paren': ['error', 'never'],
        'quotes': ['error', 'single', { 'allowTemplateLiterals': true }],
        'no-unreachable': 'error',
    },
};
