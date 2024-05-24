const webpack = require('webpack');
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
        path: path.resolve(__dirname, 'public'),
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: 'static' }
            ]
        }),
        new webpack.DefinePlugin({
            'process.env.RECAPTCHA_PUBLIC_KEY': JSON.stringify(process.env.RECAPTCHA_PUBLIC_KEY),
        }),
    ]
};

module.exports = [main];