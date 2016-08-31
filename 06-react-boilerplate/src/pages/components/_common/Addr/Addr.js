import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import net from 'net';
import { getItem, setItem ,delItem } from 'utils';
import {
    Toast
} from 'antd-mobile';
import API_ROOT from '../../../constants/apiRoot';

import List from './List';
import Create from './Create';

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
            let param = {};
            Toast.loading(null, 0);
            net.ajax({
                url: API_ROOT['_ADDR_GET_MAIN'],
                type: 'GET',
                param,
                success: (res) => {
                    Toast.hide();
                    options.data = initItem(res);
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
function initItem(res){
    let itemArr = [];
    let itemObj = {};
    for (let i = 0; i < res.data.length; i++) {
        itemArr = [...itemArr,res.data[i].id];
        itemObj[res.data[i].id] = res.data[i];
    }
    let {_count} = res;
    return {itemArr,itemObj,_count};
}
class Addr extends React.Component {
    static popup = AddrStatics.popup; //API：形式创建节点；Component：不使用则可以使用组件方式

    constructor(props,context) {
        super(props);
        this.handleClose = this.handleClose.bind(this);
        this.handleType = this.handleType.bind(this);
    }
    componentWillMount(){
        let {showType} = this.props;
        this.state ={
            showType
        };
    }
    componentWillUnmount () {
        console.info('卸载组件');
    }
    handleClose(event) {
        event.preventDefault();
        this.props.onClose && this.props.onClose();
    }
    handleType(event){
        let $this = event.target;
        let showType = $this.getAttribute('data-type');
        this.setState({
            showType
        });
    }
    render() {
        let {show,data,selectId} = this.props;
        let {
            itemArr,
            itemObj
        } = data;
        if (!show) {
            return null;
        }
        switch (this.state.showType) {
            case 1:
                return (
                    <List onClose = {this.handleClose}
                      itemArr = {itemArr}
                      itemObj = {itemObj}
                      selectId = {selectId}
                      onType = {this.handleType}
                    />
                );
            default:
                return (
                    <Create onClose = {this.handleClose} 
                            onType = {this.handleType}
                    />
                );
        }
    }
}

Addr.propTypes = {

};

export default Addr;