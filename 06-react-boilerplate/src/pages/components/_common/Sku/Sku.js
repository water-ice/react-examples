import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
//import pureRender from 'pure-render-decorator';
import net from 'net';
import { getItem, setItem ,delItem } from 'utils';
import './Sku.scss';
import {
    Toast
} from 'antd-mobile';
import API_ROOT from 'apiRoot';
/*let DomId = '_wds_sku_container' + (Math.random() + '').slice(2);
let Dom = document.getElementById(DomId);
if (!Dom) {//不需要自己建立节点
    Dom = document.createElement('div');
    Dom.className = 'wds-sku';
    Dom.id = DomId;
    document.body.appendChild(Dom);
}*/
let Dom = document.body;
let SkuStatics = {};
SkuStatics = {
    sku(options){
        return new Promise((resolve, reject) => {
            const div = document.createElement('div');
            Dom.appendChild(div);
            options = {
                ...options,
                show: true,
                onCloseSoon: () => {
                    ReactDOM.unmountComponentAtNode(div); //卸载组件
                    Dom.removeChild(div); //Dom可以写成div.parentNode感觉更加合理些
                    delete _global.APIS.sku;
                },
                onSure: (res) => {//成功回调
                    options.onCloseSoon();
                    resolve(res);
                },
                onClose: () => {//失败回调
                    options.onCloseSoon();
                    reject();
                }
            };
            /*异步请求数据，不放入redux*/
            let param = {
                goods_id:options.goods_id
            };
            let localData = getItem('sku_goods');
            if (localData && options.goods_id != localData.goods_id) { //id一样不重新拉取数据
                delItem('sku_goods');
                delItem('sku_selected');
                localData = null;
            }
            Toast.loading(null, 0);
            net.ajax({
                url: API_ROOT['_SKU_MAIN_GET'],
                type: 'GET',
                param,
                localData,
                success: (res) => {
                    Toast.hide();
                    options = {...options,data:skuStock(res)};
                    setItem('sku_goods', res);
                    _global.APIS.sku = div; //路由变化清理页面
                    return ReactDOM.render(<Sku {...options} />, div);
                },
                error: (res) => {
                    reject();
                    return !1;
                }
            });
        });
    },
    popup(options){
        if (typeof options !== 'object') {
            return console.error('options is not object');
        }
        return SkuStatics.sku(options);
    }
};
/*计算库存*/
function skuStock(data){//商品的属性
    let goods_props = data.goods_props;//商品属性this.data在open中获取
    for (let i in goods_props) {//对象
        let porpEach = goods_props[i];
        for (let j in porpEach.gps) {//数组
            let porpEachGps = porpEach.gps[j],
            porp = [porpEach.id + ":" + porpEachGps.prop_vid];
            porpEach.gps[j].stock = getStock(porp,data);//给物品设置库存量
        }
    }
    return data;
}
/*selected，当前选中的label*/
function changeArray(prop){
    if(!(prop instanceof Array)){ //如果不是数组
        let select =[];
        for (let i in prop){
            if(prop[i]!=null){
                select = [...select,i+':'+prop[i]];
            }
        }
        prop = select;
    }
    return prop;
}
/*当前选中的库存*/
function getStock(prop,data) {
    prop = changeArray(prop);
    let products = data.products,//produsts所有的商品组合
    stock = 0;
    for (let i in products){//对象
        if(checkStock(prop, products[i].props)){
            stock = stock + parseInt(products[i].stock);
        }
    }
    //console.log(stock);//每个属性有的商品总数
    return stock;
}
/*根据属性，是否在products[i].props中*/
function checkStock(prop, productprops) {
    let state = !0;
    for (let i in prop){//第一次计算库存的时候为prop只有一个；//数组
        if (productprops.indexOf(prop[i]) == -1) {//检测数据是否在productprops中 -1表示没有找到
            //找不到false
            state  = !1;
            break;
        }
    }
    return state;
}
/*把选中商品属性类型读取出来,用于设置初始state,比如提取出的值"props": "2353:281127;2354:281130;6085:281133"*/
function getPropStr(product_id,data) {
    let products = data.products;
    for (let i in products){
        if (products[i].id == product_id){
            return products[i].props;
        }
    }
    return null;
}
/*商品信息*/
function getSkuInfo(prop,data) { //商品信息
    prop = changeArray(prop);
    let products = data.products,
    selectInfo = null;
    for (let i in products) {
        let product = products[i];//选中商品的id
        if (prop.length==Object.keys(data.goods_props).length&&checkStock(prop, product.props)) {
            selectInfo = {
                goods_id: data.id, //选中商品的id goods_id
                price: product.price, //价格
                props_str: product.props_str, //规格
                vip_price: product.vip_price,//会员价格
                stock:product.stock,
                img:product.img,
                product_id:product.id
            };
            break;
        }
    }
    if(selectInfo==null){
        selectInfo = {
            goods_id: data.id, //选中商品的id
            price: data.price==data.max_price?data.price: data.price+"~"+data.max_price, //价格
            props_str: null, //规格
            vip_price:null,
            stock:data.stock,
            img:data.img,
            product_id:null
        };
    }
    return selectInfo;
}
//不使用pureRender，不用对比，因为数据每次操作都改变；
//@pureRender
class Sku extends React.Component {
    static popup = SkuStatics.popup; //API：形式创建节点；Component：不使用则可以使用组件方式

    constructor(props,context) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.handleSure = this.handleSure.bind(this);
        this.handleLabel = this.handleLabel.bind(this);
        this.handleQuantity = this.handleQuantity.bind(this);
        this.handleCartBuy = this.handleCartBuy.bind(this);
    }
    componentWillMount(){
        //console.log(this.props);
        let {data,product_id} = this.props;
        let {goods_props} = data;
        let productsProps;
        let selected = {};

        if(product_id&&product_id!=0){//获取默认选择
            productsProps = getPropStr(product_id,data);
            productsProps = productsProps.split(";");
            let x ;
            for(let i in productsProps){
                x = productsProps[i].split(":");
                selected[x[0]] = x[1];
            }
        }else{
            for(let i in goods_props){
                selected[i] = null;
            }
            selected = {...selected,...getItem('sku_selected')};
        }
        /*计算库存*/
        let stock = getStock(selected,data);
        let selectInfo = getSkuInfo(selected,data);
        this.state = Object.assign({},{stock},{selected},{selectInfo},{value:1});
    }
    componentWillUnmount () {
        console.info('卸载组件');
    }
    validateSelect(){
        let selectInfo = this.state.selectInfo;
        let {data} = this.props;
        if(selectInfo.product_id==null&&data.products!=''){
            Toast.hide();
            Toast.loading(null, 0);
            Toast.info('请选择');
            return !0;
        }
    }
    handleQuantity(event){
        /*start*/
        let $this = event.target;
        let type = $this.getAttribute('data-type');
        let quantity;
        if(type == 'minus'){
            quantity = this.state.value - 1;
        }else if(type == 'plus'){
            quantity = this.state.value + 1;
        }else{
            quantity = parseInt($this.value);
        }
        let stock = this.state.stock;
        if(isNaN(quantity)||quantity <= 0){
            Toast.hide();
            Toast.info('至少可购买1件');
            quantity = 1;
        }else if(quantity > stock){
            Toast.hide();
            Toast.info('最多可购买'+stock+'件');
            quantity = stock;
        }
        this.setState({
            value:parseInt(quantity)
        });
    }
    handleClose(event) {//关闭
        event.preventDefault();
        this.props.onCloseSoon && this.props.onCloseSoon();
    }
    handleSure(event) {//确认选择
        event.preventDefault();
        let selectInfo = this.state.selectInfo;
        let {data} = this.props;
        if(this.validateSelect()){return !1;}
        let param = {
            ...selectInfo,
            cart_id:this.props.cart_id
        };
        if(this.props.product_id == selectInfo.product_id){
            this.props.onCloseSoon && this.props.onCloseSoon();
            return !1;
        }
        Toast.loading(null, 0);
        net.ajax({
            url: API_ROOT['_SKU_MAIN_PUT'],
            type: 'PUT',
            param,
            success: (res) => {
                Toast.hide();
                this.props.onSure && this.props.onSure(param);
            },
            error: (res) => {
                Toast.hide();
                alert('error');
                Toast.info(res.msg,3);
            }
        });
    }
    handleLabel(event){//选择规格
        let $this = event.target;
        let {data,product_id} = this.props;
        let str = $this.getAttribute('data-str').split(":");
        if($this.getAttribute('class').includes('checked')){
            str[1]=null;
        }
        let selected = {...this.state.selected,[str[0]]: str[1]};
        let stock = getStock(selected,data);
        let selectInfo = getSkuInfo(selected,data);
        this.setState({
            value:1,
            stock,
            selected,
            selectInfo:selectInfo
        });
        setItem('sku_selected',selected);
    }
    handleCartBuy(event){//立即购买（type=1），购物车（type=0）
        let selectInfo = this.state.selectInfo;
        let {data} = this.props;
        if(this.validateSelect()){return !1;}
        let type = Number(event.target.getAttribute('data-type'));
        let param = {
            action:type?"buy":"addCart",
            product_id:selectInfo.product_id||0,
            goods_id:this.props.goods_id,
            quantity:this.state.value
        };
        Toast.loading(null, 0);
        net.ajax({
            url: type?API_ROOT['_SKU_MAIN_BUY']:API_ROOT['_SKU_MAIN_CART'],
            type: 'POST',
            param,
            success: (res) => {
                Toast.hide();
                this.props.onCloseSoon && this.props.onCloseSoon();
                type?_global.history.push('/order'):Toast.info('加入购物车成功');
            },
            error: (res) => {
                return !1;
            }
        });
    }
    renderGoodsProps(){
        let {goods_props} = this.props.data;
        let html,arr=[];
        for (let i in goods_props){
            arr = [...arr,i];
        }
        html = arr.map((item,index)=>{
            return (
                <li key = {item}>
                    <h2>{goods_props[item].name}</h2>
                    <div>
                        {this.renderLabel(goods_props[item].gps,item)}
                    </div>
                </li>
            );
        });
        return html;
    }
    renderLabel(arr,item){//规格id对应的数组，规格id
        let html;
        let {data} = this.props;
        html = arr.map((obj,index)=>{
            let checked = this.state.selected[item]==obj.prop_vid;
            let unSelectedProps;
            let unstock = 1;//不小于0就行
            if(!checked){ //计算没有被checked的？是否还应该判定不在同一个li中
                /*let selected = this.state.selected;
                selected[item] = obj.prop_vid;*/
                //以上方法需要注意转化成下面的方法，间接修改了this.state.selected的值，是浅复制;
                let selected = {...this.state.selected,[item]:obj.prop_vid};
                unstock = getStock(selected,data);
            }
            return (
                <label  
                    key = {obj.prop_vid}
                    data-str={`${item}:${obj.prop_vid}`}
                    onClick = {this.handleLabel}
                    className={
                        classNames(
                            {
                                'checked':(checked),
                                'disabled':(obj.stock<=0),
                                'disabled':(unstock<=0)
                            }
                        )
                    }
                >
                {obj.prop_value}
                </label>
            );
        });
        return html;
    }
    renderSwith(){/*事件还没编辑*/
        const { btnType } = this.props;
        switch (btnType) {
            case 0:/*加入购物车 立即购买 其他地方*/
                return (
                    <div className="w-row">
                        <div className="w-col-6" onClick = {this.handleCartBuy} data-type="0">
                            加入购物车
                        </div>
                        <div className="w-col-6 w-bg-orange" onClick = {this.handleCartBuy} data-type="1">
                            立即购买
                        </div>
                    </div>
                );
            case 1:/*加入购物车 其他地方*/
                return (<div onClick = {this.handleCartBuy} data-type="0">加入购物车</div>);
            case 2:/*立即购买 其他地方 用于秒杀等*/
                return (<div onClick = {this.handleCartBuy} data-type="1">立即购买</div>);
            case 3:/*购物车点击*/
                return (<div onClick = {this.handleSure}>确认修改</div>);
            case 4:/*加入购物车 /*从商品详情底部点击*/
                return (<div onClick = {this.handleCartBuy} data-type="0">确认</div>);
            case 5:/*立即购买 /*从商品详情底部点击*/
                return (<div onClick = {this.handleCartBuy} data-type="1">确认</div>);
            case 6:/*立即购买 /*砍价*/
                return (<div>确认</div>);
            default:
                return (<div>确认</div> );
        }
    }
    render() {
        const {show} = this.props;
        if (!show) {
            return null;
        }

        return (
            <div className="w-reset">
                <div className="w-bg-fixed w-close" onClick={this.handleClose}></div>
                <div className="popup-sku w-bg-white w-fixed w-row">
                    <div className="w-row w-pd-lr w-bd-b">
                        <div  className="w-col-4 w-tc">
                            <img  src={this.state.selectInfo.img} />
                        </div>
                        <span className="w-col-7">
                            <p className="w-oneline">{this.props.data.title}</p>
                            <div className="popup-sku-price">￥
                                <span>{this.state.selectInfo.price}</span>
                            </div>
                            <em>库存：<span className="cart-stock-num">{this.state.stock}</span>件</em>
                        </span>
                        <i className="iconfont w-col-1 w-tr popup-sku-close icon-close" onClick={this.handleClose} />
                    </div>
                    <div className="popup-sku-content w-pd">
                        <ul>
                           {this.renderGoodsProps()}
                       </ul>
                    </div>
                    {this.props.btnType!=3&&
                    <div className="w-row w-pd">
                        <label className="w-col-7 w-tr w-pd-r">数量 :</label>
                        <div className="w-col-5">
                            <i  
                                className="iconfont w-btn-step icon-minus"
                                data-type = "minus" 
                                onClick = {this.handleQuantity}
                            />
                            <input  
                                className="w-btn-input" 
                                type="tel" 
                                value={this.state.value} 
                                onChange = {this.handleQuantity}
                            />
                            <i  
                                className="iconfont w-btn-step icon-plus"
                                data-type = "plus"
                                onClick = {this.handleQuantity} 
                            />
                        </div>
                    </div>
                    }
                    <div  className="popup-sku-btn">
                        {this.renderSwith()}
                    </div>
                </div>
            </div>
        );
    }
}

Sku.propTypes = {
    cart_id:React.PropTypes.string,
    btnType:React.PropTypes.number,
    goods_id:React.PropTypes.string,
    product_id:React.PropTypes.string,
    show:React.PropTypes.bool,
    onClose:React.PropTypes.func,
    onSure:React.PropTypes.func,
    data:React.PropTypes.object
};

export default Sku;