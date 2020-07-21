var config = {
    entry: './main.js',
    output: {

        filename: 'dist/index.js',
    },
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