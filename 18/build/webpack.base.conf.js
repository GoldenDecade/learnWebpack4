const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const glob = require('glob')

const {CleanWebpackPlugin} = require('clean-webpack-plugin')

/*！！！ 这里相对src目录用的是./ 说明是同级 */
const files = glob.sync('./src/views/*/index.js')
console.log(files);
let newEntries = {
    // vendor: ['vue', 'vue-router', './public/jquery.js']
};
files.forEach((filepath)=> {
    let name = /.*\/src\/(views\/\w+\/index)/.exec(filepath)[1]
    console.log(name);
    newEntries[name] = filepath;
})

module.exports ={
    entry: newEntries,
    output: {
        publicPath: './',
        path: path.resolve(__dirname, '../dist'),
        filename: '[name]-[hash:5].bundle.js',
        chunkFilename: '[name]-[hash:5].chunk.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: [
                    {
                        loader: 'babel-loader'
                    },
                    'eslint-loader'
                ]
            },
        ]
    },
    /*optimization: {
        chunks: "async",
        minSize: 30000,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        name: true,
        cacheGroups: {
            vendors: {
                test: /[\\/]node_modules[\\/]/,
                priority: -10
            },
            default: {
                minChunks: 2,
                priority: -20,
                reuseExistingChunk: true
            }
        }
    },*/
    plugins: [
        new CleanWebpackPlugin()
    ]
}