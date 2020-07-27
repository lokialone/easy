const HtmlWebPackPlugin = require('html-webpack-plugin');
// const DonePlugin = require('./plugin/DonePlugin');
// const ZipPlugin = require('./plugin/ZipPlugin');
const path = require('path');
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    resolveLoader: {
        modules:[path.resolve(__dirname, 'loader'), path.resolve(__dirname, 'node_modules')]//设置优先使用本地loader文件夹下的loader
    },
    module:{
        rules:[
            {
                test: /\.js$/,
                use: ['babel-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: path.resolve(__dirname, 'public/index.html')
        }),
        // new ZipPlugin({filename: 'assets.zip'})
    ]
}