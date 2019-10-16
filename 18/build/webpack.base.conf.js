const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const glob = require('glob')

/*！！！ 这里相对src目录用的是./ 说明是同级 */
const files = glob.sync('./src/views/*/index.js')
console.log(files);
let newEntries = {};
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
    }
}