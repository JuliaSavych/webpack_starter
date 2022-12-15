const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = merge(common, {
    // By setting the mode parameter to either development, production or none, you can enable webpack's built-in
    // optimizations that correspond to each environment. The default value is production.
    mode: 'development',

    // This option controls if and how source maps are generated.
    devtool: 'eval-source-map', // <=== recommended choice for development builds with high quality SourceMaps

    // This set of options is picked up by webpack-dev-server
    devServer: {
        port: 3000, // <=== Specify a port number to listen for requests on
        hot: true, // <=== HMR exchanges, adds, or removes modules while an application is running, without a full reload.
        compress: true, // <=== Enable gzip compression for everything served
        // publicPath: '/',
        // contentBase: path.resolve(__dirname, '../dist'),
        historyApiFallback: true, // <=== The index.html page will likely have to be served in place of any 404 responses
        // writeToDisk: true,
        proxy: { // <=== Proxying some URLs can be useful when you have a separate API backend development server, and you want to send API requests on the same domain.
            '/api': {
                target: process.env.API_URL,
                secure: false,
                changeOrigin: true,
                logLevel: 'debug'
            }
        }
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                path.resolve(__dirname, '../dist')
            ]
        })
    ]
});