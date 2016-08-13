const path = require('path');
const webpack = require('webpack');

const node_modules = path.resolve(__dirname, 'node_modules');
const pathToReact = path.resolve(node_modules, 'react/dist/react.min.js');
const pathToReactDOM = path.resolve(node_modules, 'react-dom/dist/react-dom.min.js');

const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const port = 8080;
const config = {
	devtool:'source-map',
    resolve: {//重定向路径
        alias: {
        	// react 没法加速build，因为react-addons-css-transition-group ？？未知
        	//'react'			: 	'react/dist/react.min.js',
        	// react-dom 没法加速build，因为会报错？？
        	//'react-dom'		: 	'react-dom/dist/react-dom.min.js',
        	'react-router'	: 	'react-router/umd/ReactRouter.min.js',
        	'redux'			: 	'redux/dist/redux.min.js',
        	'react-redux'	: 	'react-redux/dist/react-redux.min.js',

        	'utils'			: path.resolve(__dirname, 'app/page/utils/utils'),
        	'net'			: path.resolve(__dirname, 'app/page/utils/net'),
        	'pure-render-decorator': path.resolve(__dirname, 'app/page/utils/pure-render-decorator'),
        }
    },
    entry: [
         'webpack/hot/dev-server',
         'webpack-dev-server/client?http://localhost:'+port,
         path.resolve(__dirname, 'app/page/main.js')
       ],
	output: {
      	path: path.resolve(__dirname, '/build'),
       	filename: '[name].[hash:8].js',
   	    publicPath: './' // html引用路径
    },
    module: {
        loaders: [
	        {
	            test: /\.jsx?$/, 
	            loader: 'babel',
	            exclude:[
	                //在node_modules的文件不被babel理会
	                path.resolve(__dirname,'node_modules'),
	            ],
	            include:[
	                //指定app这个文件里面的采用babel
	                path.resolve(__dirname,'app'),
	            ],
	            /*query:{//.可以在.babelrc声明
	                //plugins:['transform-runtime'],
	                presets:['es2015','stage-0','react']
	            } */
	        },  
	        {//css
	            test: /\.css$/, 
	            loader: 'style!css' 
	        },
	        {// SASS
	          test: /\.scss$/,
	          loader: 'style!css!sass'
	        },
	        {
	            test: /\.(jpe?g|png|gif|svg)$/i,
	            loader: 'url?limit=25000'
	        }
        ],
        noParse: [
	        //'react/dist/react.min.js',
	        // 'react-dom/dist/react-dom.min.js',
	        'react-router/umd/ReactRouter.min.js',
	        'redux/dist/redux.min.js',
	        'react-redux/dist/react-redux.min.js'
	    ]
    },
  	plugins: [
	    new HtmlWebpackPlugin({
	      template: 'app/index.tpl.html',
	      inject: 'body',
	      filename: 'index.html'
	    }),
	    new webpack.DefinePlugin({//开发环境
	      'process.env.NODE_ENV': JSON.stringify('development'),
	      __DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false'))
	    }),
	    new webpack.HotModuleReplacementPlugin(),
	    new webpack.NoErrorsPlugin(),
	    new OpenBrowserPlugin({ url: 'http://localhost:'+port})
	  ]
};
module.exports = config;