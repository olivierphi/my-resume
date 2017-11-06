const path = require("path");
const nodeExternals = require("webpack-node-externals");
const WebpackShellPlugin = require("webpack-shell-plugin");

/**
 * Many many many (many) thanks to:
 * > https://medium.com/@liheyse/react-server-side-rendering-ssr-with-express-and-css-modules-722ef0cc8fa0
 */

const ROOT_DIR = path.resolve(__dirname, "../");

module.exports = {
  entry: path.resolve(ROOT_DIR, "src/bin/generate-static.js"),
  output: {
    filename: "generate-static.js",
    path: path.resolve(ROOT_DIR, "bin/"),
  },
  resolve: {
    modules: ["node_modules", "webapp/src", "webapp-ssr/src"],
    extensions: [".js"],
  },
  target: "node",
  externals: nodeExternals({
    modulesDir: path.resolve(ROOT_DIR, "../node_modules"),
  }),
  plugins: [
    new WebpackShellPlugin({
      dev: false, //we *do* want to trigger that "build end" hook after *each* file change
      onBuildEnd: ["npm run render"],
    }),
  ],
  watchOptions: {
    ignored: "bin/*",
  },
  module: {
    rules: [
      // Base setup: Babel!
      {
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env"],
          },
        },
      },
      // Images management (on the SSR side we just send that to the null-loader)
      {
        test: /\.(png|jp(e*)g|svg)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 5000, // Convert images < 5kb to base64 strings
            name: "img/[name]-[hash:hex:12].[ext]",
            outputPath: "img/",
            publicPath: "/",
            fallback: "file-loader",
            emitFile: false, //images > 5kb will just be sent to the great nowhere (they are managed by the browser-side build)
          },
        },
      },
      // SCSS management (on the SSR side we just send that to the null-loader)
      {
        test: /\.scss$/,
        use: "null-loader",
      },
      // SSR-specific assets management (we load HTML & JSON files)
      {
        test: /\.(html|json)/,
        use: "raw-loader",
      },
      // Fonts management (on the SSR side we just send that to the null-loader)
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ["null-loader"],
      },
    ],
  },
};
