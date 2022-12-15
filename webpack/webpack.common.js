/* Webpack is a static module bundler for modern JavaScript applications.
 * When webpack processes your application, it internally builds a dependency graph from one or more entry points and then
 * combines every module your project needs into one or more bundles, which are static assets to serve your content from.
*/

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const jsLoaders = require('./loaders/js-loaders');
const stylesLoader = require('./loaders/styles-loaders');

module.exports = {
    // Instructs webpack to generate runtime code for a specific environment
    target: 'web', // <=== can be omitted as default is 'web', compile for usage in a browser-like environment

    // An entry point indicates which module webpack should use to begin building out its internal dependency graph.
    // Webpack will figure out which other modules and libraries that entry point depends on (directly and indirectly).
    // By default its value is ./src/index.js
    entry: path.join(__dirname, '../src/index.js'),

    // The output property tells webpack where to emit the bundles it creates and how to name these files.
    // It defaults to ./dist/main.js for the main output file and to the ./dist folder for any other generated file.
    // The top-level output key contains a set of options instructing webpack on how and
    // where it should output your bundles, assets, and anything else you bundle or load with webpack.
    output: {
        path: path.resolve(__dirname, 'dist'), // <=== The output directory as an absolute path
        publicPath: '/', // <=== This option specifies the public URL of the output directory when referenced in a browser
        // This option determines the name of each output bundle. The bundle is written to the directory specified by the output.path option.
        filename: '[name].[contenthash].bundle.js',
        clean: true, // <=== Clean the output directory before emit.
        assetModuleFilename: (pathData) => {
            const filepath = path
                .dirname(pathData.filename)
                .split("/")
                .slice(1)
                .join("/");
            return `${filepath}/[name].[hash][ext][query]`;
        }
    },

    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.(woff|woff2|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                type: 'asset/resource'
            },
            {
                test: /\.(scss|css)$/,
                use: stylesLoader
            },
            {
                test: /\.(js)?$/,
                use: jsLoaders,
                exclude: /(node_modules)/
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            'process.env.API_URL': JSON.stringify(process.env.API_URL)
        }),
        new HtmlWebpackPlugin({
            title: 'Webpack App',
            template: path.join(__dirname, '../src/index.html'),
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output, both options are optional
            filename: '[name].[contenthash].css'
        }),
    ]
}