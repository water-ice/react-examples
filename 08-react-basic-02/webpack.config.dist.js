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
		 * 这里不用dev模式下的输出html，改用js输出是为了版本控制；index.html会造成缓存，导致即使js带hash无效（微信端是这样）
		 * 需要屏蔽HtmlWebpackPlugin功能，即注释
		 */
		new AssetsPlugin({
			filename: resetPath('dist/js/webpack-assets.js'),
			processOutput: function(assets) {
				return 'window.WEBPACK_ASSETS = ' + JSON.stringify(assets);
			}
		}),
		/**
		 * 压缩同时转移静态文件
		 */
		new CopyWebpackPlugin([
			{ from: resetPath('agent/static'), to: '[name].[ext]', toType: 'template' },
		]),
		new CopyWebpackPlugin([
			{ from: resetPath('train/static'), to: 'train/[name].[ext]', toType: 'template' },
		]),
		new CopyWebpackPlugin([
			{ from: resetPath('shop/static'), to: 'shop/[name].[ext]', toType: 'template' },
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