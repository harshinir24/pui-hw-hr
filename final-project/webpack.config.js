const path = require('path');

module.exports = {
  entry: './your-entry-file.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};