const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const alias = require('./webpack.alias');
const { merge } = require('webpack-merge');

const CopyPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");

const Dotenv = require('dotenv')
const WebPackHelper = require('./webpack.helper')



/* SECTION: DEFINE ENV FILES */

const ROOT = path.join(__dirname, '../')

let dotenvCommon = require('dotenv').config({path: path.join(ROOT, '.env.common')});
let env = undefined;

if (process.env.NODE_ENV === 'production') {
    const dotenvProd = Dotenv.config({path: path.join(ROOT, '.env.prod')});
    env = WebPackHelper.merge(dotenvProd.parsed, process.env);
} else {
    env = Dotenv.config({path: path.join(ROOT, '.env.dev')}).parsed;
}

const mergedEnv = WebPackHelper.merge(dotenvCommon.parsed, env);

/* SECTION: DEFINE ENV FILES */




module.exports = merge(alias, {
  target: 'web', //we need this line because webpack 5 with webpack-web-server v3 has a bug with hot reload.
  entry: {
      app: "./src/index.js"
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.sass'],
    modules: ['node_modules']
  },
  plugins: [
      new HtmlWebpackPlugin({
          template: './src/index.html',
      }),
      new webpack.ProvidePlugin({
          "React": "react",
      }),
      new CopyPlugin({
        patterns: [
            { from: "./public", to: "public" },
            { from: "./src/robots.txt", to: "robots.txt" },
        ],
      }),
      new CompressionPlugin({
          minRatio: 1 // this means that all files gziped that are less in byte than current file is compressed.
      }),
      new webpack.DefinePlugin({
          'process.env': JSON.stringify(mergedEnv)
      }),
  ],
  module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.(css|scss|sass)$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.jpg$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            outputPath: 'dist',
                        },
                    }
                ]
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: '@svgr/webpack',
                        options: {
                            outputPath: 'images',
                        },
                    },
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'images',
                        },
                    },
                ],
            }
        ]
    },
});