let Mock  = require('mockjs');
module.exports = function() {

    let res = {};
    /*start*/
    //res.test        = require('./data/test');
    res.reset        = {v:1};
    res.home        = require('./data/home');
    res.cart        = require('./data/cart');
    res.sku         = require('./data/sku');
    res.order       = require('./data/order');
    res.addr        = require('./data/addr');
    res.district    = require('./data/district');
    res.logis       = require('./data/logis');
    res.payment     = require('./data/payment');
    res.user        = require('./data/user');
    res.orderlist   = require('./data/orderlist');
    res.orderdetail   = require('./data/orderdetail');
    res.ordercomment   = require('./data/ordercomment');
    res.orderrefund   = require('./data/orderrefund');
    res.category   = require('./data/category');
    /*end*/
    /*让返回的值status都为1*/
    for (let i in res){
        res[i].status = 1;
    }
    return res;
};