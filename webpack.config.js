const CopyWebpackPlugin = require('copy-webpack-plugin');

const path = require('path');

const main = {
    // mode: 'development',
    mode: 'production',
    entry: {
        main: ['./src/index.js'],
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'build'),
    },
    module: {
        rules: [
            {
                test: /\.png$/i,
                loader: 'url-loader',
            },
            {
                test: /\.webp$/i,
                loader: 'url-loader',
            },
            {
                test: /\.svg$/i,
                loader: 'url-loader',
            },
        ],
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: 'static' }
            ]
        })
    ]
};

module.exports = [main];