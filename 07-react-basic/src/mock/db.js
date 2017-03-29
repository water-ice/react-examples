let Mock  = require('mockjs');
module.exports = function() {
	let res = {};
	/*start*/
	res.test        = require('./data/test');
	return res;
};