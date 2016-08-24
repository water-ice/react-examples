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
                "product_id": "0",
                "goods_title": "新品上市 110g鸭腿",
                "old_price": "7.50",
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
                "old_price": "2.00",
                "prop": "",
                "quantity": 1,
                "seckill": 0,
                "status": 1,
                "stock": "68",
                "price": 1.98,
                "img": "http://osscdn.weiyian.com/image/zyz/160517/450581473414.jpg"

            }
        ]
    };
    res.sku = {
        "id": "2009",
        "title": "翅中",
        "img": "http://osscdn.weiyian.com/image/test/160616/043422817713.jpg",
        "price": "1.53",
        "max_price": "17.00",
        "stock": "99",
        "show_inventory": 0,
        "goods_props": {
            "617": {
                "id": "617",
                "name": "呗",
                "listorder": "1",
                "gps": [
                    {
                        "prop_vid": "619",
                        "prop_value": "啊"
                    },
                    {
                        "prop_vid": "658",
                        "prop_value": "a"
                    },
                    {
                        "prop_vid": "659",
                        "prop_value": "b"
                    }
                ]
            },
            "650": {
                "id": "650",
                "name": "引号测试的来的",
                "listorder": "1",
                "gps": [
                    {
                        "prop_vid": "655",
                        "prop_value": "2"
                    },
                    {
                        "prop_vid": "656",
                        "prop_value": "!!@@##"
                    }
                ]
            },
            "651": {
                "id": "651",
                "name": "sd的dfd的",
                "listorder": "1",
                "gps": [
                    {
                        "prop_vid": "654",
                        "prop_value": "1"
                    }
                ]
            }
        },
        "products": [
            {
                "id": "167861",
                "goods_id": "2009",
                "img": "http://osscdn.weiyian.com/image/test/160616/043422817713.jpg",
                "price": "17.00",
                "stock": "0",
                "props": "617:619;650:655;651:654",
                "props_str": "啊:2:1"
            },
            {
                "id": "167864",
                "goods_id": "2009",
                "img": "http://osscdn.weiyian.com/image/test/160616/043422817713.jpg",
                "price": "17.00",
                "stock": "20",
                "props": "617:619;650:656;651:654",
                "props_str": "啊:!!@@##:1"
            },
            {
                "id": "167862",
                "goods_id": "2009",
                "img": "http://osscdn.weiyian.com/image/test/160616/043422817713.jpg",
                "price": "17.00",
                "stock": "19",
                "props": "617:658;650:655;651:654",
                "props_str": "a:2:1"
            },
            {
                "id": "167865",
                "goods_id": "2009",
                "img": "http://osscdn.weiyian.com/image/test/160616/043422817713.jpg",
                "price": "17.00",
                "stock": "20",
                "props": "617:658;650:656;651:654",
                "props_str": "a:!!@@##:1"
            },
            {
                "id": "167863",
                "goods_id": "2009",
                "img": "http://osscdn.weiyian.com/image/test/160616/043422817713.jpg",
                "price": "17.00",
                "stock": "20",
                "props": "617:659;650:655;651:654",
                "props_str": "b:2:1"
            },
            {
                "id": "167866",
                "goods_id": "2009",
                "img": "http://osscdn.weiyian.com/image/test/160616/043422817713.jpg",
                "price": "17.00",
                "stock": "20",
                "props": "617:659;650:656;651:654",
                "props_str": "b:!!@@##:1"
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