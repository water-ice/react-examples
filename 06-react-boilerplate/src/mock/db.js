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
                "img": "http://wx.qlogo.cn/mmopen/6mXOeYa4HU856QyIE4wprRFhvpHafqX2H9icVQ5UPvhqhVOlBGHp2DQl2s9f6TVZg8amPyAiccluo3TTMYIQdVlg/0"
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
                "img": "http://wx.qlogo.cn/mmopen/6mXOeYa4HU856QyIE4wprRFhvpHafqX2H9icVQ5UPvhqhVOlBGHp2DQl2s9f6TVZg8amPyAiccluo3TTMYIQdVlg/0"

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
    res.order = {"status":1,"data":{"logis":[{"id":"1","name":"快递","price":"0.00"},{"id":"1","name":"快递","price":"0.00"}],"coupon_id":"368","coupon":{"id":"368","enabled":1,"type":"1","amount_save":"10000","amount":"100.00","fee":"100.00","item_id":"","start_at":"2016-05-31 11:11:17","end_at":"2016-10-08 11:11:19"},"fullcut":"","order_goods":[{"id":"5048","logis_type":"1","goods_id":"1584","goods_title":"定时上下架测试","img":"http://osscdn.weiyian.com/image/test/160510/873854719859.jpg","stock":"1995","price":"170.00","price_save":17000,"props_str":"申达股份 成都市高富帅 tfrftd","quantity":10,"seckill":0,"groupbuy":0,"buy_limit":"2","buy_limit_type":"0","fullcut":0,"coupon":1,"shipping_type":-1,"sku_item_id":"152020","product_sn":""},{"id":"6481","logis_type":"45","goods_id":"2009","goods_title":"翅中","img":"http://osscdn.weiyian.com/image/test/160616/043422817713.jpg","stock":"99","price":"17.00","price_save":1700,"props_str":"b !!@@## 1","quantity":2,"seckill":0,"groupbuy":0,"buy_limit":"10","buy_limit_type":"0","fullcut":0,"coupon":1,"shipping_type":-1,"sku_item_id":"167866","product_sn":"20"}],"integral":{"id":22,"type":1,"integral":163400,"fee":"1634.00","set_integral":"100","set_price":"1"},"amounts":{"amount":0,"goods_amount":"1734.00","coupon_amount":"1734.00","fee_amount":1734,"logis_amount":0,"integral_amount":"1634.00"},"id":1,"member_id":143503,"addr_id":"335","addr":{"id":"335","consignee":"aaa","province":"330000","city":"330100","district":"330105","province_name":"浙江省","city_name":"杭州市","district_name":"拱墅区","mobile":"15968763535","address":"dfsdafsdaf"},"store_id":"30","store":{"id":"30","consignee":"微一案门店一","mobile":"0571-58962314","address":"浙江省 宁波市 海曙区 一号仓库","invalid":["w0","w3","w4","w5","w6",{"start":"00:00","end":"09:59"},{"start":"14:00","end":"23:59"}],"remark":""},"is_store":"2"}};
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