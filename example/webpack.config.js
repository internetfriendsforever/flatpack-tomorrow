const path = require('path')
const FlatpackWebpackPlugin = require('../webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, 'index.js'),

  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name]-[hash].js',
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [
          path.resolve(__dirname, '../node_modules'),
          path.resolve(__dirname, '../lib')
        ]
      }
    ]
  },

  plugins: [
    new FlatpackWebpackPlugin()
  ]
}
