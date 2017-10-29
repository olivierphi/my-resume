const path = require("path");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const webpackCommonConfig = require("./webpack.config.browser.common");
const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const WebpackMonitor = require("webpack-monitor");

const ROOT_DIR = path.resolve(__dirname, "../");

/**
 * @link https://webpack.js.org/guides/production/
 * @link https://github.com/webpackmonitor/webpackmonitor
 */
module.exports = webpackMerge(webpackCommonConfig, {
  devtool: "source-map",
  plugins: [
    new UglifyJSPlugin({
      sourceMap: true,
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
      },
    }),
    new WebpackMonitor({
      capture: true,
      target: path.resolve(ROOT_DIR, "../var/webpack-monitor.store.json"),
      launch: true,
      port: 3030, // default -> 8081
    }),
  ],
});
