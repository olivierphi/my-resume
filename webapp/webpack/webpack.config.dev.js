const path = require("path");

const ROOT_DIR = path.resolve(__dirname, "../");

module.exports = {
  entry: path.resolve(ROOT_DIR, "src/index.js"),
  output: {
    filename: "app.js",
    path: path.resolve(ROOT_DIR, "../dist"),
  },
  resolve: {
    modules: ["node_modules", "src"],
    extensions: [".js"],
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env"],
          },
        },
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 8000, // Convert images < 8kb to base64 strings
            name: "images/[hash]-[name].[ext]",
          },
        },
      },
    ],
  },
};
