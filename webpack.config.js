const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const DIST_PATH = path.resolve(__dirname, 'dist');

const HTML_TEMPLATE = {
  title: 'Frontend app template', // change me
};

module.exports = {
  entry: {
    index: ['./src/index.ts'],
  },
  output: {
    filename: '[name].js',
    path: DIST_PATH,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  devServer: {
    contentBase: DIST_PATH,
    compress: true,
    port: 9000,
  },
  plugins: [
    new HtmlWebpackPlugin(HTML_TEMPLATE),
  ],
};
