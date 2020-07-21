var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

var config = {
    entry: './main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'index_bundle.js'
    },
    plugins: [new HtmlWebpackPlugin()],
    devServer: {
        historyApiFallback: true,
        inline: true,
        port: 5000
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    }
}
module.exports = config;