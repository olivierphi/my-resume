const path = require("path");
const nodeExternals = require("webpack-node-externals");
const WebpackShellPlugin = require("webpack-shell-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

/**
 * Many many many (many) thanks to:
 * > https://medium.com/@liheyse/react-server-side-rendering-ssr-with-express-and-css-modules-722ef0cc8fa0
 */

const ROOT_DIR = path.resolve(__dirname, "../");

const extractSass = new ExtractTextPlugin({
  filename: "../../dist/css/main.css",
  allChunks: true,
  disable: false,
});

module.exports = {
  entry: path.resolve(ROOT_DIR, "src/bin/generate-static.js"),
  output: {
    filename: "generate-static.js",
    path: path.resolve(ROOT_DIR, "bin"),
  },
  resolve: {
    modules: ["node_modules", "webapp/src", "webapp-ssr/src"],
    extensions: [".js"],
  },
  target: "node",
  externals: nodeExternals(),
  plugins: [
    new WebpackShellPlugin({
      dev: false, //we *do* want to trigger that "build end" hook after *each* file change
      onBuildEnd: ["npm run ssr:render"],
    }),
    extractSass,
  ],
  watchOptions: {
    ignored: "bin/*",
  },
  module: {
    rules: [
      // Base setup: Babel!
      {
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env"],
          },
        },
      },
      // Images management
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
      // SCSS management
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [
            {
              loader: "css-loader",
            },
            {
              loader: "sass-loader",
              options: {
                includePaths: [path.resolve(ROOT_DIR, "../webapp/assets/scss")],
              },
            },
          ],
        }),
      },
      // SSR-specific assets management (we load HTML & JSON files)
      {
        test: /\.(html|json)/,
        use: "raw-loader",
      },
    ],
  },
};
