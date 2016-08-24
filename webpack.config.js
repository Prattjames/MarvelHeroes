/*eslint-disable*/
var webpack = require('webpack');

var devFlagPlugin = new webpack.DefinePlugin({
    __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
});

var precss       = require('precss');
var autoprefixer = require('autoprefixer');
var postImport   = require('postcss-import');
var postUrl      = require('postcss-url');
var postCssNext  = require('postcss-cssnext');
var postBrowser  = require('postcss-browser-reporter');
var postReporter = require('postcss-reporter');

console.log("listen to http://localhost:8080");

module.exports = {
  debug: true,
  devtool: 'source-map',
  eslint: {
    configFile: '.eslintrc',
  },
  entry: [
    './app/index.js',
    'webpack-dev-server/client?http://localhost:8080',
  ],
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js',
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      },
    },
    {
      exclude: /node_modules/,
      loaders: ["babel-loader?plugins=transform-runtime&presets[]=es2015&presets[]=stage-1&presets[]=react", "eslint-loader"],
      test: /\.js$/,
    },
    {
      test: /\.less$/,
      loader: "style!css!less",
    }],
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    devFlagPlugin,
  ],
};
