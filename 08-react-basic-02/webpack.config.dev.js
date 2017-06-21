process.env.NODE_ENV = 'development';
const path = require('path');
const node_modules = path.resolve(__dirname, 'node_modules');

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const commonConfig = require('./webpack.config.common').commonConfig;
const resetPath = require('./webpack.config.common').resetPath;

let webpackConfig = {
	plugins: [
		/**
		 * 输出html
		 */
		new HtmlWebpackPlugin({
			template: resetPath('home/static/index.tpl.html'),
			chunks: ['common', 'home'], // 当前路由所包含的模块，注意common引入方式
			inject: 'body',
			filename: './index.html'
		}),
		new HtmlWebpackPlugin({
			template: resetPath('agent/static/index.tpl.html'),
			chunks: ['common', 'agent'], // 当前路由所包含的模块，注意common引入方式
			inject: 'body',
			filename: './agent/index.html'
		}),
		new HtmlWebpackPlugin({
			template: resetPath('shop/static/index.tpl.html'),
			chunks: ['common', 'shop'], // 当前路由所包含的模块，注意common引入方式
			inject: 'body',
			filename: './shop/index.html'
		}),
		/**
		 * 开发环境
		 */
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development'),
			__DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
		}),
	]
};

module.exports = webpackMerge(
	commonConfig,
	webpackConfig
);