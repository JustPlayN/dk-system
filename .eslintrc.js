module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 禁止出现多余空格
    'no-multi-spaces': [ 2, {
      ignoreEOLComments: true                       // 忽略注释前面的空格
    }],
    'comma-dangle': ['error', 'only-multiline'],    // 允许使用拖尾逗号
    'no-trailing-spaces': ['error', {
      'skipBlankLines': true,                       // 允许在空行使用空白符
      'ignoreComments': true,                       // 允许在注释块中使用空白符
    }],                                             // 允许使用行尾空白
    'space-infix-ops': ['off'],                     // 允许 中缀运算符周围有空格
    'no-callback-literal': ['off'],                 // 允许使用callback
    'space-unary-ops': ['off']                      // 允许：++、--、!、!!、new等
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
