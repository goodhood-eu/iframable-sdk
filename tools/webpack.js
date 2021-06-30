const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { version } = require('../package');

module.exports = {
  mode: 'production',
  entry: {
    main: './src/index.js',
    styles: './src/styles.scss',
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    library: {
      name: 'GoodHoodSDK',
      type: 'umd',
      export: 'default',
    },
    umdNamedDefine: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new webpack.DefinePlugin({
      __VERSION: JSON.stringify(version),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 3,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['postcss-preset-env'],
              },
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
};
