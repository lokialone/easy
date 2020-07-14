const HtmlWebPackPlugin = require('html-webpack-plugin');
// const DonePlugin = require('./plugin/DonePlugin');
const ZipPlugin = require('./plugin/ZipPlugin');
const path = require('path');
module.exports = {
    entry: './src/index.js',
    plugins: [
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, 'public/index.html')
        }),
        new ZipPlugin({filename: 'assets.zip'})
    ]
}