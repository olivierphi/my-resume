const path = require("path");
const webpackCommonConfig = require("./config.browser.common");
const webpackMerge = require("webpack-merge");

const ROOT_DIR = path.resolve(__dirname, "../");

module.exports = webpackMerge(webpackCommonConfig, {
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.resolve(ROOT_DIR, "../dist"),
  },
});
