import Path from "path";
import Webpack from "webpack";

export default {
  // http://webpack.github.io/docs/configuration.html#entry
  entry: {
    bundle: "./frontend/app",
  },

  // http://webpack.github.io/docs/configuration.html#output
  output: {
    // http://webpack.github.io/docs/configuration.html#output-path
    path: Path.resolve(__dirname, "public"),

    // http://webpack.github.io/docs/configuration.html#output-filename
    filename: "bundle.js",
    chunkFilename: "[name].js?",

    // http://webpack.github.io/docs/configuration.html#output-publicpath
    publicPath: "http://localhost:2992/public/",

    // http://webpack.github.io/docs/configuration.html#output-pathinfo
    pathinfo: true,
  },

  // http://webpack.github.io/docs/configuration.html#debug
  debug: true,

  // http://webpack.github.io/docs/configuration.html#devtool
  // Use "inline-source-map" when you need sources
  devtool: null,

  // http://webpack.github.io/docs/configuration.html#profile
  profile: false,

  // http://webpack.github.io/docs/configuration.html#module
  module: {
    // http://webpack.github.io/docs/loaders.html
    loaders: [
      // https://github.com/babel/babel-loader
      {test: /\.(js(\?.*)?)$/, loaders: ["babel?stage=0"], exclude: /node_modules/},

      // https://github.com/webpack/json-loader
      {test: /\.(json(\?.*)?)$/, loaders: ["json"]},

      // https://github.com/webpack/css-loader
      {test: /\.(css(\?.*)?)$/, loaders: ["style", "css"]},

      // https://github.com/webpack/less-loader
      {test: /\.(less(\?.*)?)$/, loaders: ["style", "css", "less"]},

      // https://github.com/webpack/url-loader
      {test: /\.(jpg(\?.*)?)$/,   loaders: ["url?limit=100000"]},
      {test: /\.(jpeg(\?.*)?)$/,  loaders: ["url?limit=100000"]},
      {test: /\.(png(\?.*)?)$/,   loaders: ["url?limit=100000"]},
      {test: /\.(gif(\?.*)?)$/,   loaders: ["url?limit=100000"]},
      {test: /\.(svg(\?.*)?)$/,   loaders: ["url?limit=100000"]},
      {test: /\.(ttf(\?.*)?)$/,   loaders: ["url?limit=100000"]},
      {test: /\.(woff(\?.*)?)$/,  loaders: ["url?limit=100000"]},
      {test: /\.(woff2(\?.*)?)$/, loaders: ["url?limit=100000"]},
      {test: /\.(eot(\?.*)?)$/,   loaders: ["url?limit=100000"]},
    ],
  },

  // http://webpack.github.io/docs/configuration.html#resolve
  resolve: {
    // http://webpack.github.io/docs/configuration.html#resolve-root
    root: Path.resolve("./frontend"),

    // http://webpack.github.io/docs/configuration.html#resolve-modulesdirectories
    modulesDirectories: ["node_modules"],
  },
};
