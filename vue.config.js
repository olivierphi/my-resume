module.exports = {
  baseUrl: "/",
  assetsDir: "assets",

  lintOnSave: true,

  configureWebpack: function(webpackConfig) {
    webpackConfig.entry = {
      app: ["./src/entry-point-browser.ts"],
    };
  },

  devServer: {
    overlay: {
      warnings: true,
      errors: true,
    },
  },
};
