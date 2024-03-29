const path = require('path');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');

// root path for this project
const ROOT = path.join(__dirname, '../');

module.exports = merge(common,
    {
        mode: 'development',
        devServer: {
            contentBase: path.join(ROOT, 'dist'),
            hot: true,
            open: true,
            historyApiFallback: true,
            port: 3000,
            headers: { // Important to dont get errors with SharedArrayBuffer since https://developer.chrome.com/blog/enabling-shared-array-buffer/
                'Cross-Origin-Embedder-Policy': 'require-corp',
                'Cross-Origin-Opener-Policy': 'same-origin'
            }
        },
        output: {
            filename: 'js/[name].bundle.js',
            path: path.join(ROOT, 'dist'),
            publicPath: '/',
        },
    });