console.log(`NODE_ENV : ${process.env.NODE_ENV}`);
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const webpackConfig = {
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
			'@img'					: path.resolve(__dirname, 'src/img'),
			'@actions'				: path.resolve(__dirname, 'src/pages/actions'),
			'@components'			: path.resolve(__dirname, 'src/pages/components'),
			'@constants'			: path.resolve(__dirname, 'src/pages/constants'),
			'@utils'				: path.resolve(__dirname, 'src/pages/utils')
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
					//需要引入antd-mobile，后续可以等它支持2.x做修改
					path.resolve(__dirname, "node_modules") 
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
				test: /\.(jpe?g|png|gif)$/i,
				use: 'url-loader'
			},
			{
				test: /\.svg$/,
				loader: 'svg-sprite-loader',
				include: [
					// antd-mobile 内置svg，后续可以等它支持2.x做修改
					require.resolve('antd-mobile').replace(/warn\.js$/, ''), 
					// path.resolve(__dirname, 'src/img'),  // 业务代码本地私有 svg 存放目录
				],
			}
		]
	}
};
const defaultConfig = {
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
		port: process.env.NODE_ENV != 'development' ? 9090 : 8080,
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
module.exports = webpackMerge(
	webpackConfig,
	defaultConfig
);