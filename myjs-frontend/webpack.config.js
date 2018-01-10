const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

const parts = require('./config/webpackConfigParts');

const PATHS = {
  app: path.join(__dirname, 'src'),
  appEntry: path.join(__dirname, 'src', 'client.js'),
  styleLess: [
    path.join(__dirname, 'node_modules/react-select/dist/react-select.css'),
    path.join(__dirname, 'src', 'main.less')
  ],
  build: path.join(__dirname, 'dist')
}

const common = {
  entry: {
    app: PATHS.appEntry,
    style: PATHS.styleLess
  },
  output: {
    path: PATHS.build,
    publicPath: '/',
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      // Required
      inject: false,
      template: './public/index.ejs',

      // Optional
      title: 'ERMP API GATEWAY',
      description: 'ERMP API GATEWAY',
      appMountId: 'root',
      googleAnalytics: {
        trackingId: 'UA-XXXX-XX',
        pageViewOnLoad: true
      },
      mobile: true
    })
  ]
};

const config = (() => {
  switch(process.env.npm_lifecycle_event) {
    case 'build':
    case 'watch':
      return merge(
        common,
        {
          devtool: 'source-map',
          output: {
            path: PATHS.build,
            filename: '[name].[chunkhash].js',
            chunkFilename: '[chunkhash].js'
          }
        },
        parts.clean(path.join(PATHS.build, '*')),
        parts.setupLess(PATHS.styleLess)
      );
    default:
      return merge(
        common,
        {
          devtool: 'source-map'
        },
        parts.setupLess(PATHS.styleLess)
      );
  }

})();

module.exports = config;