const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const ROOT_DIR = path.resolve(__dirname, "../");

const extractSass = new ExtractTextPlugin({
  // Since most of the content is already generated by the SSR part, we don't want to let the SCSS
  // content in the JS modules but we don't want to use them once they are extracted neither.
  // --> let's extract them to a path where we won't actually use them! :-)
  filename: "../var/unused.css/main.unused.css",
  allChunks: true,
  disable: false,
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
  plugins: [extractSass],
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
            limit: 1, // Never convert images to base64 strings - we handle that in the SSR part anyway
            name: "../var/unused.img/[name].unused.[ext]",
            fallback: "file-loader",
          },
        },
      },
      // SCSS management
      // (we won't actually use it, as it's already managed by the SSR side - but we still have to configure it)
      // See webpack.config.webapp-ssr.js for the real setup (which is very close to this one, the only difference being the export path)
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
