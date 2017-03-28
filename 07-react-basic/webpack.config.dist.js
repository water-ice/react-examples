console.log(`NODE_ENV : ${process.env.NODE_ENV}`);
const path = require('path');
const node_modules = path.resolve(__dirname, 'node_modules');

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');

let webpackConfig = {
	resolve: {//重定向路径
		mainFiles: ["index.web","index"],
		modules: [path.resolve(__dirname, "src"), "node_modules"],
		extensions: ['.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.ts', '.tsx', '.js', '.jsx', '.json', '.css', '.less', '.scss'],
		alias: {
			'utils'			: path.resolve(__dirname, 'src/pages/utils/utils'),
			'net'			: path.resolve(__dirname, 'src/pages/utils/net'),
			'pure-render-decorator'	: path.resolve(__dirname, 'src/pages/utils/pure-render-decorator'),
			'apiRoot'				: path.resolve(__dirname, 'src/pages/constants/apiRoot'),
			'SetTitle'				: path.resolve(__dirname, 'src/pages/components/_common/SetTitle/SetTitle'),
		}
	},
	entry: {
		main: './src/pages/main.js'
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: '[name].[hash:8].js',
		/**
		 * html引用路径
		 */
		publicPath: '/'
	},
	plugins: [
		new ExtractTextPlugin({
			filename: 'initial.[hash:8].css', 
			allChunks: true
		}),
		/**
		 * 这里不用dev模式下的输出html，改用js输出是为了版本控制；index.html会造成缓存
		 * 需要屏蔽HtmlWebpackPlugin功能，即注释
		 */
		new AssetsPlugin({
			filename: 'dist/webpack-assets.js',
			processOutput: function(assets) {
				return 'window.WEBPACK_ASSETS = ' + JSON.stringify(assets);
			}
		}),
		/**
		 * 输出html
		 */
		new HtmlWebpackPlugin({
			template: 'src/static/index.tpl.html',
			inject: 'body',
			filename: 'index.html'
		}),
		/**
		 * 压缩同时转移静态文件
		 */
		new CopyWebpackPlugin([
				{ from: 'src/static', to: '', toType: 'file' },
		]),
		/**
		 * 生产环境
		 */
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production'),
			__DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
		}),
		/**
		 * 优化
		 * 查找相等或近似的模块，避免在最终生成的文件中出现重复的模块
		 */
		new webpack.optimize.CommonsChunkPlugin({
			name: ['main']
		}),
		/**
		 * 优化
		 * webPack 提供了内建插件，直接配置以下代码即可压缩代码
		 */
		new webpack.optimize.UglifyJsPlugin({
			output: {
				comments: false,  // remove all comments（没有注释）
			},
			compress: {
				warnings: false
			}
		}),
		/**
		 * 报错继续运行2.0弃用NoErrorsPlugin，改用NoEmitOnErrorsPlugin
		 */
		new webpack.NoEmitOnErrorsPlugin(),
	],

	module: {
		exprContextCritical: false,
		rules: [
			{
				test: /\.jsx?$/,
				exclude:[
					/**
					 * 在node_modules的文件不被babel理会
					 */
					path.resolve(__dirname,'node_modules'),
				],
				use: ['babel-loader']
			}, 
			{
				test: /\.(css|scss)$/,
				use: ['style-loader','css-loader','sass-loader'],
				include: [
				    path.resolve(__dirname, "node_modules") //需要引入antd-mobile
			  	]
			},
			{
				test: /\.less$/,
				use: ['style-loader','css-loader','less-loader'],
			},
			{
				test: /\.scss$/,
				exclude: [/node_modules/, /src\/pages/], 
				use: ExtractTextPlugin.extract({
					fallbackLoader: 'style-loader',
					use: ['css-loader','sass-loader']
				})
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				use: 'url-loader'
			}
		]
	}

};

let defaultConfig = {
	devtool: 'source-map',
	output: {
		filename: '[name].[hash:8].bundle.js',
		sourceMapFilename: '[name].[hash:8].bundle.map',
		chunkFilename: '[id].[hash:8].chunk.js'
	},
	resolve: {
		extensions: ['.jsx', '.js']
	},
	devServer: {
		contentBase: './',
		port: 9090,
		inline: true,
		stats: 'errors-only',
		historyApiFallback: true,
		watchOptions: {
			aggregateTimeout: 100,
			poll: 500
		}
	},
	node: {
		global: true,
		crypto: 'empty',
		__dirname: true,
		__filename: true,
		Buffer: false,
		clearImmediate: false,
		setImmediate: false
	}
};
module.exports = webpackMerge(defaultConfig, webpackConfig);