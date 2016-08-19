import React, {
	Component,
	PropTypes
} from 'react';
import * as types from '../../../constants/actions/cart';
/*ant*/
import {
	Toast,
	Flex,
	WhiteSpace,
	WingBlank,
	Button
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
		this.handleQuantity = this.handleQuantity.bind(this); // 删除

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

		/*Toast.loading(null, 0);
		let url = types.CART_DELETE_MAIN;
		let param = {
			id:id||this.props.cart.main.carts
		};

		let params = {
			param: param,
			ajaxType: 'POST',
			onSuccess: (res) => {
				Toast.hide();
			},
			onError: (res) => {
				Toast.hide();
			}
		};
		this.props.actions.request(url, params, {});*/
		this.props.actions.cartDelete(id);
	}
	handleQuantity(event){
		let $this  = event.target;
		let info = $this.getAttribute('data-id').split('_');
		let type = info[0];
		let id = info[1];
		let quantity;
		let {itemObj} = this.props.cart.main;
		let curQuantity = parseInt(itemObj[id].quantity);
		if(type == 'minus'){
			quantity = curQuantity - 1;
		}else if(type == 'plus'){
			quantity = curQuantity + 1;
		}else{
			quantity = parseInt($this.value);
		}
		this.props.actions.cartQuantity(id,quantity);
	}
	renderInvalid(){
		let { _invalid } = this.props.cart.main; 
		if(_invalid>0){
			return (
				<div className="w-tc cart-lose-del">
					<i className="iconfont">&#xe621;</i>
					<span>清除失效宝贝</span>
			  	</div> 
			);
		}
	}
	render() {
		//console.log('render');
		const {
			cart,
			actions
		} = this.props;
		const edit = this.state.edit;
		if (cart.main._count == 0) {
			return (
				<div className="cart-no w-tc">
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
	      				  onQuantity = {this.handleQuantity}
	      			/>
	      			{this.renderInvalid()}
	      			<Footer edit = {edit} 
	      					main = {cart.main} 
	      					onSelect = {this.handleSelect}
	      					onDelete = {this.handleDelete}
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