
module.exports = {
    entry: {
        'xwingsidebar': "./src/scripts/xwingsidebar.jsx",
        'xwingsidebar-settings': "./src/scripts/xwingsidebar-settings.jsx",
    },
    output: {
        path: './build/scripts',
        publicPath: '/build/scripts',
        filename: "[name].js"
    },
    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loaders: ['babel']
            }
        ]
    }
};
