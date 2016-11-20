module.exports = {
    entry: {
        'xwingsidebar': "./src/scripts/xwingsidebar.jsx",
        'xwingsidebar-settings': "./src/scripts/xwingsidebar-settings.jsx",
    },
    output: {
        path: './build',
        publicPath: '/build',
        filename: "[name].js"
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loaders: ['babel']
            },
            {
                test: /\.scss$/,
                loaders: ['style', 'css', 'sass'] // Note that the order is important here, it means that 'style-loader' will be applied to the ouput of 'css-loader'
            }
        ]
    }
};
