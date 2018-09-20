const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const nodeExternals = require("webpack-node-externals");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const VueSSRServerPlugin = require("vue-server-renderer/server-plugin");

module.exports = {
  entry: path.resolve(__dirname, "..", "src", "entry-point-server.ts"),

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true,
          appendTsSuffixTo: ["\\.vue$"],
          happyPackMode: false,
        },
        exclude: /node_modules/,
      },
      // SCSS management (on the SSR side we just send that to the null-loader)
      {
        test: /\.scss$/,
        use: "null-loader",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, "..", "tsconfig.json"),
      }),
    ],
  },
  output: {
    filename: "dist/built-server-bundle.js",
    path: path.resolve(__dirname, "..", "dist"),
  },

  // This allows webpack to handle dynamic imports in a Node-appropriate
  // fashion, and also tells `vue-loader` to emit server-oriented code when
  // compiling Vue components.
  target: "node",

  // For bundle renderer source map support
  devtool: "source-map",

  // This tells the server bundle to use Node-style exports
  output: {
    libraryTarget: "commonjs2",
  },

  // https://webpack.js.org/configuration/externals/#function
  // https://github.com/liady/webpack-node-externals
  // Externalize app dependencies. This makes the server build much faster
  // and generates a smaller bundle file.
  externals: nodeExternals({
    // do not externalize dependencies that need to be processed by webpack.
    // you can add more file types here e.g. raw *.vue files
    // you should also whitelist deps that modifies `global` (e.g. polyfills)
    whitelist: /\.css$/,
  }),

  // This is the plugin that turns the entire output of the server build
  // into a single JSON file. The default file name will be
  // `vue-ssr-server-bundle.json`
  plugins: [new VueLoaderPlugin(), new VueSSRServerPlugin()],
};
