import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import classnames from 'classnames';
import net from 'net';
import { getItem, setItem ,delItem } from 'utils';
import { Toast , Modal } from 'antd-mobile';
import API_ROOT from 'apiRoot';

import './Payment.scss';

let Dom = document.body;
let PaymentStatics = {};
PaymentStatics = {
    payment(options){
        //return new Promise((resolve, reject) => {
            const div = document.createElement('div');
            Dom.appendChild(div);
            options.show = true; // 展示;
            options.onSure = (res) => {
                ReactDOM.unmountComponentAtNode(div);//卸载组件
                Dom.removeChild(div);
                //resolve(res);
                delete _global.APIS.payment;
            };
            options.onClose = () => {
                ReactDOM.unmountComponentAtNode(div);
                Dom.removeChild(div);
                //reject();
                delete _global.APIS.payment;
            };
            /*异步请求数据，不放入redux*/
            let param = {
                ...options.req
            };
            Toast.loading(null, 0);
            net.ajax({
                url: API_ROOT['_PAYMENT_GET_MAIN'],
                type: 'GET', //暂时先get方法
                param,
                success: (res) => {
                    Toast.hide();
                    _global.APIS.payment = div; //路由变化清理页面
                    options.data = res.data;
                    return ReactDOM.render(<Payment {...options} />, div);
                },
                error: (res) => {
                    //reject();
                    return !1;
                }
            });
        //});
    },
    popup(options){
        if (typeof options !== 'object') {
            return console.error('options is not object');
        }
        return PaymentStatics.payment(options);
    }
};
class Payment extends React.Component {
    static popup = PaymentStatics.popup; //API：形式创建节点；Component：不使用则可以使用组件方式

    constructor(props,context) {
        super(props);
        this.state = {
            payType:"wxpay"
        };
        this.handleClose = this.handleClose.bind(this);
        this.handlePayType = this.handlePayType.bind(this);
        this.handlePay = this.handlePay.bind(this);
    }
    componentWillMount(){
    }
    componentWillUnmount () {
        console.info('卸载组件');
    }
    handlePayType(event){
        const $this = event.target;
        const type = $this.getAttribute('data-type');
        this.setState({
            payType:type
        });
    }
    handleClose(event) {
        event.preventDefault();
        Modal.alert('删除', '确定要离开么?', [
           { text: '取消'},
           { text: '确定', onPress: () => {
                //this.props.onClose && this.props.onClose();
                _global.history.pushState(null,'/');
           }}
        ]);
    }
    handlePay(){
        let param = {
            order_id:this.props.data.order_id,
            payway:this.state.payType
        };
        Toast.loading(null, 0);
        net.ajax({
            url: API_ROOT['_PAYMENT_POST_MAIN'],
            type: 'POST', //暂时先get方法
            param,
            success: (res) => {
                Toast.hide();
                _global.history.pushState(null,'/');
            },
            error: (res) => {
                Toast.hide();
                return !1;
            }
        });
    }
    render() {
        const {show,data} = this.props;
        console.log(this.props);
        const {
            pay
        } = data;
        if (!show) {
            return null;
        }

        return (
            <div className="w-reset">
                <div className="w-bg-fixed w-close" onClick={this.handleClose}></div>
                <div className="w-bg-white w-fixed w-row">
                    <p className="w-close-position">确认付款<i className="iconfont icon-close" /></p>
                    <p className="w-pd-lr w-tc">还需要支付<b className="w-orange">￥11.22</b></p>
                    <ul className="w-payment">
                    {
                        pay.map((item,index)=>{
                            return(
                                <li key={item} 
                                    className={
                                        classnames('w-'+item,{'pay-checked':item==this.state.payType})
                                    }
                                    onClick = {this.handlePayType}
                                    data-type={item}
                                >
                                {(()=>{
                                    switch(item) {
                                        case 'wxpay':
                                            return '微信支付';
                                        case 'alipay':
                                            return '支付宝支付';
                                        default:
                                            return null;
                                    }
                                })()}
                                </li>
                            );
                              
                        })
                    }
                    </ul>
                    <div className="w-bg-pink w-lh-80 w-tc" onClick = {this.handlePay}>确认付款</div>
                </div>
            </div>
        );
    }
}

Payment.propTypes = {
    req:React.PropTypes.shape({
        action:React.PropTypes.string,
        aid:React.PropTypes.string,
        lid:React.PropTypes.string,
    }),
    show:React.PropTypes.bool,
    onClose:React.PropTypes.func,
    onSure:React.PropTypes.func,
    data:React.PropTypes.object
};

export default Payment;