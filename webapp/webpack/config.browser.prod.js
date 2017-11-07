process.env.NODE_ENV = "production";

const path = require("path");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const webpackCommonConfig = require("./config.browser.common");
const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const WebpackMonitor = require("webpack-monitor");

const ROOT_DIR = path.resolve(__dirname, "../");

if (!process.env.GA_TRACKING_ID) {
  console.warn(
    `GA_TRACKING_ID env var is not set, the generated HTML won't be able to track traffic!`
  );
}

const webpackPlugins = [
  new UglifyJSPlugin({
    sourceMap: true,
  }),

  new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify("production"),
    },
  }),
];

if (!process.env.NON_INTERACTIVE) {
  webpackPlugins.push(
    new WebpackMonitor({
      capture: true,
      target: path.resolve(
        ROOT_DIR,
        "../var/webpack-monitor.browser.store.json"
      ),
      launch: true,
      port: 3030, // default -> 8081
    })
  );
}

/**
 * @link https://webpack.js.org/guides/production/
 * @link https://github.com/webpackmonitor/webpackmonitor
 */
module.exports = webpackMerge(webpackCommonConfig, {
  devtool: "source-map",
  plugins: webpackPlugins,
});
