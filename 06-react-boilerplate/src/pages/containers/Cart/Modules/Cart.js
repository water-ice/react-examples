import React, {
	Component,
	PropTypes
} from 'react';
import * as types from '../../../constants/actions/cart';

/*ant*/
import {
	Modal,
	Toast,
	WhiteSpace
} from 'antd-mobile';
import './Cart.scss';
/*components*/
import Header from '../../../components/Cart/Header';
import List from '../../../components/Cart/List';
import Footer from '../../../components/Cart/Footer';
class Cart extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			edit: !0
		};
		//console.log(this.props);
		this.handleEdit = this.handleEdit.bind(this);// 编辑事件
		this.handleSelect = this.handleSelect.bind(this); // 选择事件
		this.handleDelete = this.handleDelete.bind(this); // 删除
	}
	componentWillMount() {
		console.log('componentWillMount');
		if (this.props.cart.main.isFetching === 0) {
			Toast.loading(null, 0);
			let url = types.CART_GET_MAIN;
			let param = {};

			let params = {
				param: param,
				ajaxType: 'GET',
				onSuccess: (res) => {
					Toast.hide();
					//this.props.history.pushState(null, '/');
					//console.log(this.props);
				},
				onError: (res) => {
					Toast.hide();
					alert('error');
					/*Toast.info(res.msg,3,()=>{
						//this.props.history.pushState(null, '/');
					});*/
				}
			};
			this.props.actions.request(url, params, {});
		}
	}
	componentWillReceiveProps(nextProps) {
		console.log('componentWillReceiveProps');
		//console.log(nextProps);
		//console.log(1);
	}
	handleEdit(event) {
		this.setState({
			edit: !this.state.edit
		});
	}
	handleSelect(event){
		let $this  = event.target;
		let id = $this.getAttribute('data-id');
		this.props.actions.cartSelect(id);
	}
	handleDelete(event){
		let $this  = event.target;
		let id = $this.getAttribute('data-id');
		if(id == 'carts_lose'){
			id = this.props.cart.main.carts_lose;
			console.log(id);
		}
		let url = types.CART_DELETE_MAIN;
		let param = {
			id:id||this.props.cart.main.carts
		};

		let params = {
			param: param,
			ajaxType: 'DELETE',
			onSuccess: (res) => {
				Toast.hide();
			},
			onError: (res) => {
				Toast.hide();
			}
		};
		if(param.id instanceof Array &&param.id.length==0){
			Toast.info('至少删除1件');
			return !1;
		}
		Modal.alert('删除', '确定删除么?', [
		   { text: '取消'},
		   { text: '确定', onPress: () => {
				Toast.loading(null, 0);
		   		this.props.actions.request(url, params);
		   }}
	 	]);
	}
	renderInvalid(){
		let { _invalid } = this.props.cart.main; 
		if(_invalid>0){
			return (
				<div className="w-tc cart-lose-del">
					<i className="iconfont">&#xe621;</i>
					<span onClick = {this.handleDelete} data-id="carts_lose">清除失效宝贝</span>
			  	</div> 
			);
		}
	}
	render() {
		//console.log('render');
		const {
			cart,
			actions,
			history
		} = this.props;
		const edit = this.state.edit;
		if (cart.main._count == 0) {
			return (
				<div className="cart-no w-tc w-reset">
					<i className="iconfont">&#xe61f;</i>
					<p>主人我饿了！<br />快点去楼下给我找点吃的吧！</p>
					<a href="#" className="white">逛商城</a>
					<p>我是楼下！点我点我</p>
				</div>
			);
		} else {
			return (
				<div className="views-cart w-reset">
	      			<Header count={cart.main._count}
	      					edit 	= {edit}
	      					onEdit	={this.handleEdit} 
	      			/>
	      			<List edit = {edit} 
	      				  main = {cart.main}
	      				  onSelect = {this.handleSelect}
	      				  onDelete = {this.handleDelete}
	      				  actions = {actions}
	      			/>
	      			{this.renderInvalid()}
	      			<Footer edit = {edit} 
	      					main = {cart.main} 
	      					onSelect = {this.handleSelect}
	      					onDelete = {this.handleDelete}
	      					actions = {actions}
	      					history = {history}
	      			/>
	      		</div>
			);
		}
		
	}
}

Cart.propTypes = { //为了安全：这这里定义你的数据类型，小组件中定义传入某些state或者其他函数方法
	cart: React.PropTypes.shape({
		main :React.PropTypes.shape({
			_quantity:React.PropTypes.number,
      		carts: React.PropTypes.array.isRequired,
      		carts_temp: React.PropTypes.array.isRequired
    	}),
	}),
	actions: React.PropTypes.object
};


export default Cart;