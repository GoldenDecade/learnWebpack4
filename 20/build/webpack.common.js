const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    entry: {
        main: './src/index.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dist'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }, {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'postcss-loader'
                ]
            }, {
                test: /\.styl(us)?$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2
                        }
                    },
                    'stylus-loader',
                    'postcss-loader'
                ]
            }, {
                test: /^.(jpe?g|png|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: '[name]_[hash:7].ext', // 占位符
                        outputPath: 'images/', // 会打包到dist下,其实是output中path
                        limit: 20000  // 20KB
                    }
                }
            }, {
                test: /\.(eot|ttf|svg)$/,
                loader: 'file-loader'
            }
        ]
    },
    optimization: {
        splitChunks: { // 代码分隔
            chunks: 'all', // 'async' 只对异步的引入进行分割
            minSize: 1500,
            maxSize: 0,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,// 优先级  先走这个  再走commons
                    filename: 'vendors.bundle.js',
                },
                commons: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,// 如果一个模块被打包过了,再遇到的时候就会忽略
                    // filename: 'commons.[hash:5].js',
                    // chunks: 'initial',
                    name: 'commons'
                },
                /*styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true // 忽略上面的各种配置  直接进行分割
                }*/
            }
        }
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin(
            {
                title: 'hello world'
            }
        )
    ]
}