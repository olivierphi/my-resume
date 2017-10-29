const path = require("path");
const webpackCommonConfig = require("./webpack.config.browser.common");
const webpackMerge = require("webpack-merge");

module.exports = webpackMerge(webpackCommonConfig, {
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.resolve(ROOT_DIR, "../dist"),
  },
});
