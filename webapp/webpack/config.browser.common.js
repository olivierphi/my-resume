const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ApiUtils = require("../../api/utils");

const ROOT_DIR = path.resolve(__dirname, "../");

const extractSass = new ExtractTextPlugin({
  filename: "css/main.[md5:contenthash:hex:12].css",
});

module.exports = {
  entry: path.resolve(ROOT_DIR, "src/entrypoint.browser.js"),
  output: {
    filename: "js/app.bundle.[hash].js",
    path: path.resolve(ROOT_DIR, "../dist"),
    hashDigest: "hex",
    hashDigestLength: 12,
  },
  resolve: {
    modules: ["node_modules", "src"],
    extensions: [".js"],
  },
  devtool: "inline-source-map",
  plugins: [
    extractSass,
    new HtmlWebpackPlugin({
      template: path.resolve(ROOT_DIR, "src/index.ejs"),
      // We handle the CSS and JS ourselves in the template:
      inject: false,
      // Template vars:
      appMountId: "root",
      appInitialState: ApiUtils.getAppInitialState(
        path.resolve(ROOT_DIR, "../var"),
        "en"
      ),
      gaTrackingId: process.env.GA_TRACKING_ID,
    }),
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
            name: "img/[name]-[hash:hex:12].[ext]",
            publicPath: "/",
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
                  "../fonts": path.resolve(
                    ROOT_DIR,
                    "../node_modules/dejavu-sans/fonts"
                  ),
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
      // Fonts management
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "fonts/[name]-[hash:hex:12].[ext]",
              publicPath: "/",
            },
          },
        ],
      },
    ],
  },
};
