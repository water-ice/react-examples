let Mock  = require('mockjs');
module.exports = function() {
	let res = {};
	/*start*/
	res.test = require('./data/test');
	res.filters = require('./data/filters');
	res.logins = require('./data/logins');
	res.list = require('./data/lists');
	res.details = require('./data/details');
	return res;
};