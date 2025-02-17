module.exports = {
  'env': {
    'node': true,
    'es2021': true,
  },
  'extends': 'eslint:recommended',
  'parserOptions': {
    'ecmaVersion': 'latest',
    'sourceType': 'module',
  },
  'rules': {
    'indent': [ 'error', 2 ],
    'comma-dangle': ['error', 'always-multiline'],
    'quotes': [ 'error', 'single' ],
    'semi': [ 'error', 'always' ],
  },
};
