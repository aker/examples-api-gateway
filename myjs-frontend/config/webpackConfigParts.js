const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack-plugin');

exports.devServer = function(options) {
  return {
    entry: {
      'webpack-dev-server': 'webpack-dev-server/client?http://localhost:8080',
      hmr: 'webpack/hot/only-dev-server'
    },
    devServer: {
      contentBase: './dist',
      hot: true,
      historyApiFallback: true,
      inline: true,
      stats: 'errors-only',
      host: options.host, // Defaults to `localhost`
      port: options.port, // Defaults to 8080
      proxy: {
        '/api*' : {
          target: 'http://localhost:8080'
        }
      }
    },
    watchOptions: {
      // Delay the rebuild after the first change
      aggregateTimeout: 300,
      // Poll using interval (in ms, accepts boolean too)
      poll: 1000
    },
    plugins: [
      // Enable multi-pass compilation for enhanced performance
      // in larger projects. Good default.
      new webpack.HotModuleReplacementPlugin({
        multiStep: true
      })
    ]

  };
};

exports.setupLess = function(paths) {
  return {
    module: {
      rules: [
        {
          test: /\.(le)|(c)ss$/,
          use: ['style-loader', 'css-loader', 'less-loader'],
          include: paths
        }
      ]
    }
  };
};

exports.clean = function(path) {
  return {
    plugins: [
      new CleanWebpackPlugin([path], {
        // Without `root` CleanWebpackPlugin won't point to our
        // project and will fail to work.
        root: process.cwd()
      })
    ]
  };
};

exports.extractLESS = function(paths) {
  return {
    module: {
      loaders: [
        // Extract CSS during build
        {
          test: /\.(le)|(c)ss$/,
          // loaders: ['style', 'css', 'less'],
          loader: ExtractTextPlugin.extract(
            "style-loader",
            'css?sourceMap!' +
            'less?sourceMap'
          ),
          include: paths
        }
      ]
    },
    plugins: [
      // Output extracted CSS to a file
      new ExtractTextPlugin('[name].[chunkhash].css')
    ]
  };
};

exports.purifyCSS = function(paths) {
  return {
    plugins: [
      new PurifyCSSPlugin({
        basePath: process.cwd(),
        // `paths` is used to point PurifyCSS to files not
        // visible to Webpack. You can pass glob patterns
        // to it.
        paths: paths,
        purifyOptions: {
          // minify: false,
          // info: true,
          // output: './output.css'
        }
      })
    ]
  }
};