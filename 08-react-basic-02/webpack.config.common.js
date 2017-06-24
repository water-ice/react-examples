console.log(`NODE_ENV : ${process.env.NODE_ENV}`);
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const resetPath = (addPath) => {
	// const _reset = process.env.PATH_ENV === 'manage' ? './manage' : './client';
	const _reset = './client';
	return path.resolve(__dirname, _reset, addPath);
	 
};
const resetPort = (addPath) => {
	if (process.env.NODE_ENV != 'development') {
		return 9090;
	}else{
		return 8080;
	}
};
const webpackConfig = {
	resolve: {//重定向路径
		mainFiles: ['index.web','index'],
		modules: [resetPath(''), 'node_modules'],
		extensions: ['.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.ts', '.tsx', '.js', '.jsx', '.json', '.css', '.less', '.scss'],
		alias: {
			'pure-render-decorator'	: path.resolve(__dirname, 'common/js/utils/pure-render-decorator'),
			'@common'						: path.resolve(__dirname, 'common'),
			// 主端
			'@home/img'						: resetPath('home/img'),
			'@home/actions'					: resetPath('home/pages/actions'),
			'@home/components'				: resetPath('home/pages/components'),
			'@home/constants'				: resetPath('home/pages/constants'),
			'@home/utils'					: resetPath('home/pages/utils'),
			// 代理端
			'@agent/img'					: resetPath('agent/img'),
			'@agent/actions'				: resetPath('agent/pages/actions'),
			'@agent/components'				: resetPath('agent/pages/components'),
			'@agent/constants'				: resetPath('agent/pages/constants'),
			'@agent/utils'					: resetPath('agent/pages/utils'),
			// 零售端
			'@shop/img'						: resetPath('shop/img'),
			'@shop/actions'					: resetPath('shop/pages/actions'),
			'@shop/components'				: resetPath('shop/pages/components'),
			'@shop/constants'				: resetPath('shop/pages/constants'),
			'@shop/utils'					: resetPath('shop/pages/utils'),
		}
	},
	entry: {
		home: resetPath('home/pages/main.js'),
		agent: resetPath('agent/pages/main.js'),
		shop: resetPath('shop/pages/main.js'),
	},
	output: {
		path: resetPath('./dist'),
		filename: 'js/[name].[hash:8].bundle.js',  // 每个页面对应的主js的生成配置
		chunkFilename: 'js/[name].[hash:8].chunk.js',  // chunk生成的配置
		sourceMapFilename: 'js/[name].[hash:8].bundle.map',
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
				use: ['style-loader','css-loader','postcss-loader','sass-loader'],
				include: [
					//需要引入antd-mobile，后续可以等它支持2.x做修改
					path.resolve(__dirname, "node_modules"),
					path.resolve(__dirname, ''),  // 业务代码本地私有 css 存放目录
				]
			},
			{
				test: /\.less$/,
				use: ['style-loader','css-loader','postcss-loader','less-loader'],
			},
			{
				test: /\.scss$/,
				exclude: [path.resolve(__dirname, "node_modules"), path.resolve(__dirname, "/client/*/pages"), path.resolve(__dirname, "/manage/*/pages")], 
				use: ExtractTextPlugin.extract({
					fallbackLoader: 'style-loader',
					use: ['css-loader','postcss-loader','sass-loader']
				})
			},
			{
				test: /\.(png|jpg|gif|eot|ttf|woff|woff2)$/,
				loader: 'url-loader',
				options: {
					limit: 10000
				}
			},
			{
				test: /\.json$/i,
				use: 'json-loader'
			},
			{
				test: /\.html$/i,
				use: 'html-loader'
			},
			{
				test: /\.svg$/,
				use: 'svg-sprite-loader',
				include: [
					// antd-mobile 内置svg，后续可以等它支持2.x做修改
					require.resolve('antd-mobile').replace(/warn\.js$/, ''), 
					path.resolve(__dirname, ''),  // 业务代码本地私有 svg 存放目录
				],
			}
		]
	},
	plugins:[
		new ExtractTextPlugin({
			filename: 'css/initial.[name].[hash:8].css', 
			allChunks: true
		}),
		/**
		 * 优化
		 * 查找相等或近似的模块，避免在最终生成的文件中出现重复的模块
		 */
		new webpack.optimize.CommonsChunkPlugin({
			name: 'common', // 将公共模块提取，生成名为`common`的chunk
			chunks: ['agent', 'shop', 'home'], // 提取哪些模块共有的部分
		}),
		/**
		 * 报错继续运行2.0弃用NoErrorsPlugin，改用NoEmitOnErrorsPlugin
		 */
		new webpack.NoEmitOnErrorsPlugin(),
	]
};
const defaultConfig = {
	devtool: process.env.NODE_ENV != 'development' ? undefined : 'source-map',
	resolve: {
		extensions: ['.jsx', '.js']
	},
	devServer: {
		contentBase: "/",
		port: resetPort(),
		inline: true,
		// compress: true, // gzip
		stats: 'errors-only',
		// historyApiFallback: true,
		historyApiFallback:{
			rewrites:[
				{from: /^\/agent\//,to: "/agent/index.html"},
				{from: /^\/shop\//,to: "/shop/index.html"}
			]
		},
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
module.exports = {
	resetPath: resetPath,
	commonConfig: webpackMerge(
		webpackConfig,
		defaultConfig
	)
};
