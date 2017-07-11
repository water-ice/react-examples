console.log(`NODE_ENV : ${process.env.NODE_ENV}`);
console.log(`PATH_ENV : ${process.env.PATH_ENV}`);
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const resetPath = (addPath) => {
	const _reset = process.env.PATH_ENV === 'manage' ? './manage' : './client';
	return path.resolve(__dirname, _reset, addPath);
};
const resetPort = (addPath) => {
	if (process.env.NODE_ENV != 'development') {
		if(process.env.PATH_ENV=='client'){
			return 9090;
		}else{
			return 9091;
		}
	}else{
		if(process.env.PATH_ENV=='client'){
			return 8080;
		}else{
			return 8081;
		}
	}
};
const webpackConfig = {
	resolve: {//重定向路径
		mainFiles: ['index.web','index'],
		modules: [resetPath(''), 'node_modules'],
		extensions: ['.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.ts', '.tsx', '.js', '.jsx', '.json', '.css', '.less', '.scss'],
		alias: {
			'pure-render-decorator'	: path.resolve(__dirname, 'common/js/utils/pure-render-decorator'),
			'@img'					: resetPath('img'),
			'@actions'				: resetPath('pages/actions'),
			'@components'			: resetPath('pages/components'),
			'@constants'			: resetPath('pages/constants'),
			'@utils'				: resetPath('pages/utils'),
			'@common'				: path.resolve(__dirname, 'common')
		}
	},
	entry: {
		main: resetPath('pages/main.js'),
	},
	output: {
		path: resetPath('./dist'),
		filename: '[name].[hash:8].js',
		chunkFilename: '[name].[hash:8].chunk.js',  // chunk生成的配置
		sourceMapFilename: '[name].[hash:8].bundle.map',
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
				exclude: [path.resolve(__dirname, "node_modules"), path.resolve(__dirname, "/client/pages/"), path.resolve(__dirname, "/manage/pages/")], 
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
	plugins: [
		new ExtractTextPlugin({
			filename: 'initial.[hash:8].css', 
			allChunks: true
		}),
		/**
		 * 优化
		 * 查找相等或近似的模块，避免在最终生成的文件中出现重复的模块
		 */
		new webpack.optimize.CommonsChunkPlugin({
			name: ['common']
		}),
		/**
		 * 报错继续运行2.0弃用NoErrorsPlugin，改用NoEmitOnErrorsPlugin
		 */
		new webpack.NoEmitOnErrorsPlugin(),
		/**
		 * webpack3.x 模块串联
		 */
		new webpack.optimize.ModuleConcatenationPlugin()
	]
};
const defaultConfig = {
	devtool: process.env.NODE_ENV != 'development' ? undefined : 'source-map',
	resolve: {
		extensions: ['.jsx', '.js']
	},
	devServer: {
		contentBase: './',
		port: resetPort(),
		inline: true,
		stats: 'errors-only',
		historyApiFallback: true,
		watchOptions: {
			aggregateTimeout: 100,
			poll: 500,
			ignored: /node_modules/
		},
		/**
		 * 接口代理，用于本地调试解决跨域问题，域名自己配置
		 * 需要设置每个接口前带上/api/*，在@contants/apiRoot配置
		 */
		proxy: {
			"/api": {
				target: "http://m.ws.com",
				pathRewrite: {"^/api" : ""}
			}
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
