 const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
        entry: './index.jsx',
       // Loaders
        module: {
            rules : [
                // JavaScript/JSX Files
                {
                    test: /\.jsx$/,
                    exclude: /node_modules/,
                    use: ['babel-loader'],
                },
                {
                    test: /\.html$/,
                    use: ['html-loader']
                }
            ]
        },
        plugins: [
            new HtmlWebPackPlugin({
                template: "./public/index.html",
                filename: "./index.html"
            })
        ]
    }