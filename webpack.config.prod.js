const path = require('path');
const htmlWebapckPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// 配置文件要求我们必须导出一个配置对象
module.exports = {

    // 入口
    entry: {
        bundle: path.resolve(__dirname, './src/main.js'),
        vender1: [ 'vue', 'vue-router', 'vuex', 'v-distpicker' ],
        vender2: [ 'element-ui' ],
        vender3: [ 'axios', 'jquery', 'normalize.css' ],
    },

    // 输出
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name]_[chunkhash:8].js'
    },

    //  插件配置
    plugins: [

        // 压缩html, 自动注入打包好的js文件到body里
        new htmlWebapckPlugin({
            template: './src/index.html',         // 要处理的html
            filename: 'index.html',               // 处理后的html名称
            inject: 'body',                       // 自动注入js到什么地方
        }),

        // 每次打包前先清除dist目录
        new cleanWebpackPlugin(['./dist']),

        // 抽取公共模块
        new webpack.optimize.CommonsChunkPlugin({
            names:['vender1','vender2', 'vender3']      // 把这几个模块抽取为公共模块
        }),

        // 压缩js
        new webpack.optimize.UglifyJsPlugin(),

        // 抽取css
        new ExtractTextPlugin("[name].css"),

        // 压缩css
        new OptimizeCssAssetsPlugin()
    ],

    // loader的作用是为了让webpack可以打包其他类型的模块
    module: {

        // 配置loader, 该配置选项是必须的
        rules: [

            // 打包css
            {
                test: /\.css$/,
                // use: [ 'style-loader', 'css-loader' ]
                use: ExtractTextPlugin.extract({//
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },

            // 打包less
            {
                test: /\.less$/,
                // use: [ 'style-loader', 'css-loader', 'less-loader' ]
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader']
                })
            },

            // 打包url文件
            {
                test: /\.(png|jpg|gif|jpeg|svg|woff|ttf|eot)$/,
                use: [
                    // 默认配置全部打包进来
                    // 'url-loader'

                    // 指定小于10kb的图片才转为base64编码打包
                    {loader: 'url-loader', options: {limit: 10240}}
                ]
            },

            // 转换特殊语法编写的js文件
            {
                test: /\.js$/,
                use: [ 'babel-loader' ],
                include: path.resolve(__dirname, './src'),
                exclude: /node_modules/  // 如果项目引入了node-modules的东西,不转换它们
            },

            // 解析vue文件
            {
                test: /\.vue$/,
                use: [ 'vue-loader' ]
            }
        ]
    },

    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
          'vue$': 'vue/dist/vue.esm.js',
          '@': resolve('src')
        }
    },

    devServer: {
        contentBase: 'dist',
        port: 7777,
        open: true,
        inline: true,
        hotOnly: false,
        hot: false,
        progress: true,
    }
};
