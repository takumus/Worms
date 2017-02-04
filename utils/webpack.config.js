var path = require('path');
module.exports = {
    entry: {
        app :'./src/index.ts'
    },
    output: {
        filename: './dist/index.js',
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
