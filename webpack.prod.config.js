const path = require('path');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const config = require('./webpack.base.config');

const isAnalyze = process.env.ANALYZE === 'true';

let plugins = [
  new CleanWebpackPlugin({
    verbose: true
  }),
  new MiniCssExtractPlugin({
    filename: '[name].[contenthash:8].css',
    chunkFilename: '[name].[contenthash:8].css'
  }),
];

if (isAnalyze) {
  plugins.push(new BundleAnalyzerPlugin());
}

const prodConfig = {
  entry: {
    vendor: ['react', 'react-dom', 'react-router', 'redux'],
    main: './src/index.tsx',
  },
  output: {
    filename: '[name].[contenthash:8].js',
    chunkFilename: '[name].[contenthash:8].js',
    path: path.resolve(__dirname, './dist'),
    publicPath: '/'
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false
      }),
      new OptimizeCssAssetsPlugin()
    ],
    splitChunks: {
      chunks: 'async',
      name: true,
      cacheGroups: {
        vendor: {
          name: 'vendor',
          test: 'vendor',
          enforce: true,
          priority: 10
        },
        commons: {
          name: 'commons',
          chunks: 'initial',
          test: /[\\/][node_modules][\\/]/,
          minChunks: 2,
          priority: 2
        }
      }
    },
    runtimeChunk: {
      name: 'runtime'
    }
  },
  plugins: plugins
};

module.exports = merge(config, prodConfig);
