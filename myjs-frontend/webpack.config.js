const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PATHS = {
  app: path.join(__dirname, 'src'),
  appEntry: path.join(__dirname, 'src', 'client.js'),
  build: path.join(__dirname, 'dist')
};

module.exports = {
  entry: [
    'react-hot-loader/patch',
    PATHS.appEntry
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: PATHS.build,
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([
      { from: 'public/**', to: PATHS.build, flatten: true }
    ], {
      ignore: [
        '*.ejs'
      ]
    }),
    new HtmlWebpackPlugin({
      // Required
      inject: false,
      template: './public/index.ejs',

      // Optional
      title: 'API GATEWAY',
      description: 'ERMP API GATEWAY',
      appMountId: 'root',
      googleAnalytics: {
        trackingId: 'UA-XXXX-XX',
        pageViewOnLoad: true
      },
      mobile: true
    })
  ],
  devServer: {
    contentBase: PATHS.build,
    hot: true
  }
};