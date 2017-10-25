const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '../');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(ROOT_DIR, 'dist'),
    },
    resolve: {
        modules: ['node_modules', 'src'],
        extensions: ['.js'],
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'],
                    },
                },
            },
        ],
    },
};
