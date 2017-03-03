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
  node: {
    fs: 'empty'
  },
  externals: [
    {
      './cptable': 'var cptable'
    }
  ],
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
        test: /\.js$/,
        loader: 'ng-annotate-loader?add=true!babel-loader?presets[]=es2015',
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        loader: 'ngtemplate-loader?relativeTo=' + (path.resolve(__dirname, './src')) + '!html-loader?attrs=false?root=' + (path.resolve(__dirname, './src')),
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader', 'sass-loader']})
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader']})
      },
      {
        test: /\.(eot|ttf|woff|svg)$/,
        loader: 'file-loader?name=/assets/fonts/[name].[ext]'
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
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    host: '0.0.0.0',
    port: '9090',
  },
};

module.exports = wpConfig;
