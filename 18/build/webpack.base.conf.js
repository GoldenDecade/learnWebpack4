const path = require('path')
const Webpack = require('webpack')
const merge = require('webpack-merge')
const glob = require('glob')

const {CleanWebpackPlugin} = require('clean-webpack-plugin')

/*！！！ 这里相对src目录用的是./ 说明是同级 */
const files = glob.sync('./src/views/*/index.js')
console.log(files);
let newEntries = {
    // vendor: ['vue', 'vue-router', 'jquery'],
};
files.forEach((filepath) => {
    let name = /.*\/src\/(views\/\w+\/index)/.exec(filepath)[1]
    console.log(name);
    newEntries[name] = filepath;
})

module.exports = {
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
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                commons: {// 页面之间的公用代码
                    chunks: 'initial',
                    name: 'common',
                    minChunks: 2,
                    maxInitialRequests: 5, // The default limit is too small to showcase the effect
                    minSize: 0 // This is example is too small to create commons chunks
                },
                vendor: {// 基础类库
                    chunks: 'initial',
                    name: 'vendor',
                    test: /node_modules/,
                    priority: 10,
                    enforce: true
                },

            }
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new Webpack.ProvidePlugin({
            $:'jquery', //下载Jquery
        })
    ]
}