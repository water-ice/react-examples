/*eslint no-console:0*/
if ("production" !== process.env.NODE_ENV) {
	window.console.dev = function(msg) {
		console.log(msg);
	};
	module.exports = require('./router.dev');
}
else {
	window.console.dev = function(msg) {
		console.log(msg);
	};
	module.exports = require('./router.dist');
}
