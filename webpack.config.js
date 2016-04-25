var webpack = require('webpack');

module.exports = {
    cache: true,
    entry: {
        main: './src/index.jsx'
    },
    output: {
        path: 'public/build',
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.jsx$/,
                loader: 'babel',
                exclude: /(node_modules|bower_components)/,
                query: {presets: ['react', 'es2015']}
            },
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /(node_modules|bower_components)/,
                query: {presets: ['react', 'es2015']}
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('common.js')
    ]
};