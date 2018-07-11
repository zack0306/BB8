module.export = {
  entry: './src/index.js',
  output: {
    path: './build',
    filename: 'bundle.js',
  },
  module: {
    loader: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }],
  },
};
