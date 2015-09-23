module.exports = {
    module: {
        loaders: [
            {test: /\.jsx$/, loaders: ['react-hot', 'babel-loader'], exclude: /(node_modules|bower_components|dist)/},
            {test: /\.js$/, loader: 'babel-loader', exclude: /(node_modules|bower_components|dist)/},
            {test: /\.less$/, loader: 'style!css!less'},
            {test: /\.css$/, loader: 'style!css'},
            {test: /\.html$/, loader: 'file?name=[name].[ext]'},
            {test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]}
        ]
    },
    resolve: {
        extensions: ['', '.jsx', '.web.coffee', '.web.js', '.coffee', '.js']
    },
    context: __dirname + '/app',
    entry: {
        javascript: './app.js',
        html: './index.html'
    },
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    }
};
