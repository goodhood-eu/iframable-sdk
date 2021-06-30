module.exports = {
  presets: [
    ['@babel/preset-env', { modules: 'umd' }],
  ],
  plugins: [
    'transform-node-env-inline',
    '@babel/plugin-transform-runtime',
    '@babel/plugin-transform-strict-mode',
  ],
  env: {
    test: {
      presets: [
        ['@babel/preset-env', {
          useBuiltIns: 'usage',
          corejs: '3',
        }],
      ],
    },
  },
};
