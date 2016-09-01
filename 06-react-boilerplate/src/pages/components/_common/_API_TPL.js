import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import net from 'net';
import { getItem, setItem ,delItem } from 'utils';
import {
    Toast
} from 'antd-mobile';
import API_ROOT from 'apiRoot';

let Dom = document.body;
let AddrStatics = {};
AddrStatics = {
    addr(options){
        return new Promise((resolve, reject) => {
            const div = document.createElement('div');
            Dom.appendChild(div);
            options.show = true; // 展示;
            options.onSure = (res) => {
                ReactDOM.unmountComponentAtNode(div);//卸载组件
                Dom.removeChild(div);
                resolve(res);
                delete _global.APIS.addr;
            };
            options.onClose = () => {
                ReactDOM.unmountComponentAtNode(div);
                Dom.removeChild(div);
                reject();
                delete _global.APIS.addr;
            };
            /*异步请求数据，不放入redux*/
            let param = {
                goods_id:options.goods_id
            };
            Toast.loading(null, 0);
            net.ajax({
                url: API_ROOT['_ADDR_GET_MAIN'],
                type: 'GET',
                param,
                success: (res) => {
                    Toast.hide();
                    _global.APIS.addr = div; //路由变化清理页面
                    return ReactDOM.render(<Addr {...options} />, div);
                },
                error: (res) => {
                    reject();
                    return !1;
                }
            });
        });
    },
    popup(options){
        if (typeof options === 'string') {
            options = {
                children: options
            };
        }
        options.popup = true;
        return AddrStatics.addr(options);
    }
};
class Addr extends React.Component {
    static popup = AddrStatics.popup; //API：形式创建节点；Component：不使用则可以使用组件方式

    constructor(props,context) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
    }
    componentWillMount(){
    }
    componentWillUnmount () {
        console.info('卸载组件');
    }
    handleClose(event) {
        event.preventDefault();
        this.props.onClose && this.props.onClose();
    }
    render() {
        const {show} = this.props;
        if (!show) {
            return null;
        }

        return (
            <div className="w-reset">
                <div className="w-bg-fixed w-close" onClick={this.handleClose}></div>
                <div className="w-bg-white w-fixed w-row">
                    <ul className="address-item w-row w-pd-l w-height-30">
                        <li>
                            <i className="iconfont w-col-2 w-tc icon-not_selected" />
                            <div className="w-col-8">
                                <div>收货人:  
                                    <span>21312</span> 
                                    <span className="w-fr">2121</span>
                                </div>
                                <div className="w-twoline">地址: <span>12321</span></div>
                            </div>
                            <i className="iconfont w-col-2 icon-bianji" />
                        </li>
                    </ul>
                    <div className="w-lh-40 w-tc w-bg-pink w-white">添加新地址</div>
                </div>
            </div>
        );
    }
}

Addr.propTypes = {

};

export default Addr;