const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');

const prodConfig = {
    mode: 'production',
    devtool: 'cheap-module-eval-source-map',
    output: {
        publicPath: './'
    }
};

module.exports = merge(commonConfig, prodConfig);