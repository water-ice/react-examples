process.env.NODE_ENV = 'production';
const path = require('path');

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');

const commonConfig = require('./webpack.config.common').commonConfig;
const resetPath = require('./webpack.config.common').resetPath;

let webpackConfig = {
	plugins: [
		/**
		 * 这里不用dev模式下的输出html，改用js输出是为了版本控制；index.html会造成缓存
		 * 需要屏蔽HtmlWebpackPlugin功能，即注释
		 */
		new AssetsPlugin({
			path: resetPath('dist/'),
			filename: 'webpack-assets.js',
			processOutput: function(assets) {
				return 'window.WEBPACK_ASSETS = ' + JSON.stringify(assets);
			}
		}),
		/**
		 * 输出html
		 */
		// new HtmlWebpackPlugin({
		// 	template: resetPath('static/index.tpl.html'),
		// 	inject: 'body',
		// 	filename: 'index.html'
		// }),
		/**
		 * 压缩同时转移静态文件
		 */
		new CopyWebpackPlugin([
			{ from: resetPath('static'), to: '', toType: 'file' },
		]),
		/**
		 * 生产环境
		 */
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production'),
			__DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
		}),
	],
};

module.exports = webpackMerge(
	commonConfig,
	webpackConfig
);