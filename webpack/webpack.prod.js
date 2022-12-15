const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map', // <=== recommended choice for production builds with high quality SourceMaps
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, '../build')
    },
    optimization: {
        runtimeChunk: false,
        splitChunks: {
            chunks: 'all' // <=== Allows us to extract common dependencies into an existing entry chunk or an entirely new chunk
        }
    },
    plugins: [
        new BundleAnalyzerPlugin({
            openAnalyzer: false,
            analyzerMode: 'static'
        })
    ]
});
