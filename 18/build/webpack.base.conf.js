const path = require('path')
const os = require('os')
const Webpack = require('webpack')
const merge = require('webpack-merge')
const glob = require('glob')
let htmls = glob.sync(path.resolve(__dirname, './index.html'))
const HtmlWebpackPlugin = require('html-webpack-plugin');
let HtmlPlugins = [];
console.log(htmls);
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')

const WebpackMd5Hash = require('webpack-md5-hash');
/*！！！ 这里相对src目录用的是./ 说明是同级 */
const files = glob.sync('./src/views/*/index.js')
// console.log(files);
let newEntries = {
    // vendor: ['vue', 'vue-router', 'jquery'],
};
files.forEach((filepath) => {
    let name = /.*\/src\/(views\/(\w+)\/index)/.exec(filepath)[1]
    let htmlname = /.*\/src\/(views\/(\w+)\/index)/.exec(filepath)[2]
    console.log(name);
    newEntries[name] = filepath;
    let plug = new HtmlWebpackPlugin({
        filename: path.resolve(__dirname, '../dist/'+name+'.html'),
        template: 'index.html', //以根目录中的index.html作为模板; 路径是相对于根目录的； 这里必须写为'./index.html';
        chunks: ['runtime', 'vendor', 'common', name],
        minify: {
            collapseWhitespace: true
        }
    })
    HtmlPlugins.push(plug)
})


module.exports = {
    mode: 'development',
    entry: newEntries,
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name]-[chunkhash:5].bundle.js',
        chunkFilename: '[name]-[chunkhash:5].chunk.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',

                    },

                    // 'eslint-loader'
                ]
            },
        ]
    },
    optimization: {
        runtimeChunk: 'single',// 将包含chunks映射关系的list单独从app.js里提取出来，因为每一个chunk的id基本都是基于内容hash出来的，所以你每次改动都会影响它，如果不把它提取出来的话，等于app.js每次都会改变，缓存就失效了。
        splitChunks: {
            cacheGroups: {
                commons: {// 页面之间的公用代码
                    chunks: 'all',
                    name: 'common',
                    minChunks: 2,
                    maxInitialRequests: 5, // The default limit is too small to showcase the effect
                    minSize: 0 // This is example is too small to create commons chunks
                },
                vendor: {// 基础类库
                    chunks: 'all',
                    name: 'vendor',
                    test: /node_modules/,
                    priority: 10,
                    enforce: true
                },

            }
        }
    },
    plugins: [
        ...HtmlPlugins,
        new CleanWebpackPlugin(),
        new Webpack.ProvidePlugin({
            $:'jquery', //下载Jquery
        }),
        new WebpackMd5Hash(),
    new ParallelUglifyPlugin({
        workerCount: os.cpus().length - 1,//开启几个子进程去并发的执行压缩。默认是当前运行电脑的 CPU 核数减去1
        uglifyJS: {
            output: {
                beautify: false, //不需要格式化
                comments: true, //不保留注释
            },
            warnings: false, // 在UglifyJs删除没有用到的代码时不输出警告

            compress: {
                drop_console: true, // 删除所有的 `console` 语句，可以兼容ie浏览器
                collapse_vars: true, // 内嵌定义了但是只用到一次的变量
                reduce_vars: true, // 提取出出现多次但是没有定义成变量去引用的静态值
            }
        }
    })
    ]
}