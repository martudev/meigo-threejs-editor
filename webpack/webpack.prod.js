const path = require('path');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// root path for this project
const ROOT = path.join(__dirname, '../');

module.exports = merge(common,
    {
        mode: 'production',
        output: {
            path: path.join(ROOT, 'build'),
            filename: 'js/[name].[contenthash].bundle.js',
            publicPath: '/',
        },
        performance: {
            hints: 'warning',
            maxEntrypointSize: 512000,
            maxAssetSize: 512000
        },
        plugins: [
            new CleanWebpackPlugin()
        ],
    }
);