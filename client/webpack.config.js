const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: [
  './index.jsx' // Your appʼs entry point
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        include: __dirname
      }
    ]
  },
  devServer: {
    contentBase: './public'
  },
  plugins: [
  ]
};
