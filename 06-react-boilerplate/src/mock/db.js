let Mock  = require('mockjs');
module.exports = function() {
    let res = {};
    /*start*/
    //res.test        = require('./data/test');
    res.home        = require('./data/home');
    res.cart        = require('./data/cart');
    res.sku         = require('./data/sku');
    res.order       = require('./data/order');
    res.addr        = require('./data/addr');
    res.district    = require('./data/district');
    res.logis       = require('./data/logis');
    res.payment     = require('./data/payment');
    /*end*/
    /*让返回的值status都为1*/
    for (let i in res){
        res[i].status = 1;
    }
    console.log(res);
    return res;
};