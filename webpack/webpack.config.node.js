const path = require("path");
const nodeExternals = require("webpack-node-externals");

/**
 * Many many many (many) thanks to:
 * > https://medium.com/@liheyse/react-server-side-rendering-ssr-with-express-and-css-modules-722ef0cc8fa0
 */

const ROOT_DIR = path.resolve(__dirname, "../");

module.exports = {
  entry: "./src/index.node.js",
  output: {
    filename: "bundle.node.js",
    path: path.resolve(ROOT_DIR, "dist")
  },
  resolve: {
    modules: ["node_modules", "src"],
    extensions: [".js"]
  },
  target: "node",
  externals: nodeExternals(),
  module: {
    rules: [
      {
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env"]
          }
        }
      }
    ]
  }
};
