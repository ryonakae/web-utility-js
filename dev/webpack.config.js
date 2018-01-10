module.exports = {
  entry: __dirname + "/index.js",
  output: {
    filename: "bundle.js",
    path: __dirname
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"]
        }
      }
    ]
  },
  devServer: {
    contentBase: "dev",
    inline: true
  }
};
