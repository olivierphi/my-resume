const path = require("path");
const nodeExternals = require("webpack-node-externals");
const WebpackShellPlugin = require("webpack-shell-plugin");

/**
 * Many many many (many) thanks to:
 * > https://medium.com/@liheyse/react-server-side-rendering-ssr-with-express-and-css-modules-722ef0cc8fa0
 */

const ROOT_DIR = path.resolve(__dirname, "../");

module.exports = {
  entry: path.resolve(ROOT_DIR, "src/bin/generate-static.js"),
  output: {
    filename: "generate-static.js",
    path: path.resolve(ROOT_DIR, "bin")
  },
  resolve: {
    modules: ["node_modules", "webapp/src"],
    extensions: [".js"]
  },
  target: "node",
  externals: nodeExternals(),
  plugins: [new WebpackShellPlugin({ onBuildEnd: ["npm run ssr:render"] })],
  watchOptions: {
    ignored: "bin/*"
  },
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
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 8000, // Convert images < 8kb to base64 strings
            name: "images/[hash]-[name].[ext]"
          }
        }
      },
      {
        test: /\.(html|json)/,
        use: "raw-loader"
      }
    ]
  }
};
