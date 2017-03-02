const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const wpConfig = {
  entry: {
    'main': './src/app.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'js/[name].bundle.js'
  },
  resolve: {
    modules: [
      path.resolve(__dirname, './src'),
      'node_modules'
    ]
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        },
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        loader: 'ngtemplate?relativeTo=' + (path.resolve(__dirname, './src')) + '!html?attrs=false?root=' + (path.resolve(__dirname, './src')),
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader', 'sass-loader']})
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      LOCAL: (process.env.NODE_ENV != 'PROD')
    }),
    new CopyWebpackPlugin([
      {from: 'src/index.html', to: 'index.html'}
    ]),
    new ExtractTextPlugin({
      filename: 'css/styles.css'
    })
  ],
  devServer: {
    host: '0.0.0.0',
    port: '9090',
  },
};

module.exports = wpConfig;
