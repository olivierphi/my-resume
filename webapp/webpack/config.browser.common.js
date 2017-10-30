const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const ROOT_DIR = path.resolve(__dirname, "../");

const extractSass = new ExtractTextPlugin({
  filename: "css/main.css",
  allChunks: true,
});

module.exports = {
  entry: path.resolve(ROOT_DIR, "src/entrypoint.browser.js"),
  output: {
    filename: "app.js",
    path: path.resolve(ROOT_DIR, "../dist"),
  },
  resolve: {
    modules: ["node_modules", "src"],
    extensions: [".js"],
  },
  devtool: "inline-source-map",
  plugins: [
    extractSass,
    // Don't include tens of Moment.js locales, please :-)
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),
  ],
  module: {
    rules: [
      // Base setup: Babel!
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
      // Images management
      {
        test: /\.(png|jp(e*)g|svg)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 5000, // Convert images < 5kb to base64 strings
            name: "img/[hash]-[name].[ext]",
            fallback: "file-loader",
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
              options: {
                alias: {
                  "/img": path.resolve(ROOT_DIR, "assets/img"),
                },
              },
            },
            {
              loader: "sass-loader",
              options: {
                includePaths: [path.resolve(ROOT_DIR, "assets/scss")],
              },
            },
          ],
        }),
      },
    ],
  },
};
