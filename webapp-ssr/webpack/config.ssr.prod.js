process.env.NODE_ENV = "prod"; //we have to do this *before* requiring the common config.

const webpackCommonConfig = require("./config.ssr.common");
const webpack = require("webpack");
const webpackMerge = require("webpack-merge");

/**
 * @link https://webpack.js.org/guides/production/
 * (although most of the recipes described there don't apply here, as we are in a SSR environment - all that matters is that the CSS are minified)
 */
module.exports = webpackMerge(webpackCommonConfig, {
  devtool: "source-map",
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
      },
    }),
  ],
});
