const path = require("path");

const ROOT_DIR = path.resolve(__dirname, "../");

module.exports = {
  entry: "./src/bin/generate-app-data.js",
  output: {
    filename: "generate-app-data.js",
    path: path.resolve(ROOT_DIR, "bin"),
  },
  resolve: {
    modules: ["node_modules", "src"],
    extensions: [".js"],
  },
  target: "node",
  module: {
    rules: [
      {
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env"],
          },
        },
      },
      {
        test: /\.yaml/,
        use: "raw-loader",
      },
    ],
  },
};
