import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import './Share.scss';
import ShareImg from './Share.png';
import ShareCollectionImg  from './ShareCollection.png';
import ShareLoginImg  from './ShareLogin.png';

let Dom = document.body;
let ShareStatics = {};
ShareStatics = {
	share(options){
		const div = document.createElement('div');
		Dom.appendChild(div);
		options = {
			...options,
			show: true,
			onCloseSoon: () => {
				ReactDOM.unmountComponentAtNode(div); //卸载组件
				Dom.removeChild(div); //Dom可以写成div.parentNode感觉更加合理些
				delete _global.APIS.payment;
			},
			onSure: (res) => {//成功回调
				options.onCloseSoon();
			},
			onClose: () => {//失败回调
				options.onCloseSoon();
			}
		};
		return ReactDOM.render(<Share {...options} />, div);
	},
	popup(options){
		if (typeof options !== 'object') {
			options = {};
		}
		return ShareStatics.share(options);
	}
};
class Share extends Component {
	static popup = ShareStatics.popup; //API：形式创建节点；Component：不使用则可以使用组件方式

	constructor(props,context) {
		super(props);
		this.state = {
			show: false
		};
		this.handleClose = this.handleClose.bind(this);
	}
	componentWillMount(){
		this.setShow(this.props);
	}
	componentWillReceiveProps(nextprops){
		this.setShow(nextprops);
	}
	// 清理内存
	componentWillUnmount(){
		this.delayFn&&clearTimeout(this.delayFn);
	}
	setShow($props){
		this.delayFn&&clearTimeout(this.delayFn);
		this.delayFn = setTimeout(()=>{
			this&&this.setState({
				show:$props.show
			});
		},300);
	}
	handleClose(event) {
		event.preventDefault();
		this.setState({
			show:false
		});
		this.props.onClose && this.props.onClose();
	}
	render() {
		const {type} = this.props;
		const {
			show
		} = this.state;
		if (!show) {
			return null;
		}
		let img;
		switch(type){
			case "collection":
				img = ShareCollectionImg;
				break;
			case "login":
				img = ShareLoginImg;
				break;
			default:
				img = ShareImg;
		}
		return (
			<div className="wxshare" onClick={this.handleClose}>
				<img src={img} alt="微信分享" />
			</div>

		);
	}
}

Share.propTypes = {
};

export default Share;