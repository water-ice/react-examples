let Mock  = require('mockjs');
let Random = Mock.Random;
module.exports = function() {
    let res = {
        delete:{},
        post:{},
        put:{},
        home: {},
        list: {},
        cart: {}
    };
    /*list*/
    let images = [1, 2, 3].map(x => Random.image('200x100', Random.color(), Random.word(2, 6)));
    res.list = [];
    for (let i = 0; i < 100; i++) {

        let content = Random.cparagraph(0, 10);

        res.list.push({
            id: i,
            title: Random.cword(8, 20),
            desc: content.substr(0, 40),
            tag: Random.cword(2, 6),
            views: Random.integer(100, 5000),
            images: images.slice(0, Random.integer(1, 3))
        });
    }
    /*cart from wds*/
    //"_count":2,"_quantity":3,"_price":16.82,"_invalid":0,
    res.cart = {
        "data": [
            {
                "id": "272254",
                "goods_id": "3775",
                "product_id": "11979",
                "goods_title": "新品上市 110g鸭腿",
                "oldprice": "7.50",
                "prop": "炭烧",
                "quantity": 2,
                "seckill": 0,
                "status": 0,
                "stock": "463",
                "price": 7.42,
                "img": "http://osscdn.weiyian.com/image/zyz/160517/450581473414.jpg"
            },
            {
                "id": "272252",
                "goods_id": "3767",
                "product_id": "0",
                "goods_title": "章鸭子 手提袋",
                "oldprice": "2.00",
                "prop": "",
                "quantity": 1,
                "seckill": 0,
                "status": 0,
                "stock": "68",
                "price": 1.98,
                "img": "http://osscdn.weiyian.com/image/zyz/160517/450581473414.jpg"

            }
        ]
    };
    /*end*/
    /*让返回的值status都为1*/
    for (let i in res){
        res[i].status = 1;
/*        for (let k in res[i]._child){
            res[i]._child[k].status = 1;
        }*/
    }
    console.log(res);
    return res;
};