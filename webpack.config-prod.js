import path from "path";
import webpack from "webpack";
import ExtractTextPlugin from "extract-text-webpack-plugin";

const AUTOPREFIXER = "autoprefixer?{browsers: ['> 5%']}";

export default {
  // http://webpack.github.io/docs/configuration.html#entry
  entry: {
    bundle: "./frontend/app",
  },

  // http://webpack.github.io/docs/configuration.html#output
  output: {
    // http://webpack.github.io/docs/configuration.html#output-path
    path: path.resolve(__dirname, "public"),

    // http://webpack.github.io/docs/configuration.html#output-filename
    filename: "bundle.js?[chunkhash]",

    // http://webpack.github.io/docs/configuration.html#output-publicpath
    publicPath: "/public/",

    // http://webpack.github.io/docs/configuration.html#output-pathinfo
    pathinfo: false,
  },

  // http://webpack.github.io/docs/configuration.html#debug
  debug: false,

  // http://webpack.github.io/docs/configuration.html#devtool
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
      {test: /\.(json(\?.*)?)$/,  loaders: ["json"]},

      // https://github.com/webpack/css-loader
      {test: /\.(css(\?.*)?)$/, loader: ExtractTextPlugin.extract(`css!${AUTOPREFIXER}`)},

      // https://github.com/webpack/less-loader
      {test: /\.(less(\?.*)?)$/, loader: ExtractTextPlugin.extract(`css!${AUTOPREFIXER}!less`)},

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
    root: path.resolve("./frontend"),

    // http://webpack.github.io/docs/configuration.html#resolve-modulesdirectories
    modulesDirectories: ["node_modules"],
  },

  // http://webpack.github.io/docs/list-of-plugins.html
  plugins: [
    new ExtractTextPlugin("[name].css?[contenthash]"),
  ],
};
