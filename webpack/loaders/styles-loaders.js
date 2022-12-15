 const MiniCssExtractPlugin = require('mini-css-extract-plugin');
 const devMode = process.env.NODE_ENV === 'development';

 module.exports = [
     { loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader },
     { loader: 'css-loader' },
     { loader: 'sass-loader' }
 ]