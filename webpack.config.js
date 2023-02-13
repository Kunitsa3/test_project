const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { merge } = require('webpack-merge');

const baseConfig = {
  devtool: 'source-map',
  mode: 'development',
  entry: {
    index: './src/index.js',
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/[hash][ext]',
  },
  module: {
    rules: [
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: '[name].[contenthash].css' }),
    new HtmlWebpackPlugin({
      template: './src/about-us.html',
      filename: 'about-us.html',
      chunks: ['index'],
      inject: 'body',
      minify: false,
      scriptLoading: 'blocking',
    }),
    new HtmlWebpackPlugin({
      template: './src/contacts.html',
      filename: 'contacts.html',
      chunks: ['index'],
      inject: 'body',
      minify: false,
      scriptLoading: 'blocking',
    }),
    new HtmlWebpackPlugin({
      template: './src/pricing.html',
      filename: 'pricing.html',
      chunks: ['index'],
      inject: 'body',
      minify: false,
      scriptLoading: 'blocking',
    }),
    new HtmlWebpackPlugin({
      template: './src/tracking.html',
      filename: 'tracking.html',
      chunks: ['index'],
      inject: 'body',
      minify: false,
      scriptLoading: 'blocking',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'public',
          noErrorOnMissing: true,
        },
      ],
    }),
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
  ],
  resolve: {
    extensions: ['.js'],
  },
};
module.exports = ({ mode }) => {
  const isProductionMode = mode === 'prod';
  const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

  return merge(baseConfig, envConfig);
};
