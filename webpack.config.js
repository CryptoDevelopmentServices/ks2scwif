const path = require('path');
const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin');

module.exports = {
    mode: 'production', // or 'development'
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.js'],
        fallback: {
            "crypto": require.resolve('crypto-browserify'),
            "buffer": require.resolve('buffer/'),
            "stream": require.resolve('stream-browserify'),
            "util": require.resolve('util/'),
            "vm": require.resolve("vm-browserify"), // Added fallback for vm
        },
    },
    optimization: {
        minimizer: [new TerserPlugin({
            extractComments: false,
        })],
    },
    performance: {
        maxAssetSize: 500000,  // Increase asset size limit to 500 KB
        maxEntrypointSize: 500000,  // Increase entry point size limit
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            inject: 'body',
            scriptLoading: 'blocking',
            minify: false,
        }),
        new HtmlInlineScriptPlugin(),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
    ],
};
