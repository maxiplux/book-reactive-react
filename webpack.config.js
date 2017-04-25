module.exports = {
  entry: [
    __dirname + "/app/App.js",
  ],
  output: {
    path: __dirname + "/public",
    filename: "bundle.js",
    publicPath: "/"
  },

  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query:{
        presets: ['es2015','react']
      }
    }]
  }
};
