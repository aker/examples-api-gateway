const path = require('path');

const PATHS = {
  app: path.join(__dirname, 'src'),
  appEntry: path.join(__dirname, 'src', 'index.js'),
  build: path.join(__dirname, 'dist')
}

const config = {
  entry: PATHS.appEntry,
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  }
};

module.exports = config;