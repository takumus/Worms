var path = require('path');
module.exports = {
    entry: {
        app :'./routes/index.ts'
    },
    output: {
        filename: './dist/routes.js',
        library: ''
    },
    resolve: {
        root:[path.join(__dirname,'node_modules')],
        extensions:['', '.ts', '.webpack.js', '.web.js', '.js']
    },
    module: {
        loaders: [
            { test: /\.ts$/, loader: 'ts-loader' }
        ]
    }
}
