import React, {
	Component,
	PropTypes
} from 'react';
import * as types from '../../../constants/actions/cart';

/*ant*/
import {Toast} from 'antd-mobile';
/*components*/
import Header from '../../../components/Cart/Header';
import List from '../../../components/Cart/List';
import Footer from '../../../components/Cart/Footer';
import CartNo from '../../../components/Cart/CartNo';
import Invalid from '../../../components/Cart/Invalid';
class Cart extends Component {
	constructor(props, context) {
		super(props, context);
	}
	componentWillMount() {
		if (this.props.main.isFetching === 0) {
			Toast.loading(null, 0);
			let url = types.CART_MAIN_GET;
			let param = {};

			let params = {
				param: param,
				ajaxType: 'GET',
				onSuccess: (res) => {
					Toast.hide();
				},
				onError: (res) => {
					Toast.hide();
					alert('error');
				}
			};
			this.props.actions.request(url, params, {});
		}
	}
	componentWillUnmount () {
		console.info('卸载组件');
		//this.props.actions.navigator();
	}	
	render() {
		const {
			main,
			actions
		} = this.props;
		const {
			edit,
			itemArr,
			itemObj,
			carts,
			carts_temp,
			carts_lose,
			_price,
			_count,
			_invalid,
			_quantity
		} = main;
		return (
			<div>
				{
					_count == 0?
						<CartNo />
					:
					<div className="w-reset">
		      			<Header count={_count}
		      					edit = {edit}
		      					actions = {actions} 
		      			/>
		      			<List edit = {edit} 
		      				  actions = {actions}
		      				  itemArr = {itemArr}
	        				  itemObj= {itemObj}
	        				  carts = {carts}
		      			/>
		      			{_invalid>0&&<Invalid carts_lose={carts_lose} actions = {actions} />}
		      			<Footer edit = {edit} 
		      					actions = {actions}
		      					carts= {carts}
		      					carts_temp= {carts_temp}
		      					_quantity= {_quantity}
		      					_price= {_price}
		      			/>
		      		</div>
				}
			</div>
		);
	}
}

Cart.propTypes = { //为了安全：这这里定义你的数据类型，小组件中定义传入某些state或者其他函数方法
	main :React.PropTypes.shape({
		_quantity:React.PropTypes.number,
  		carts: React.PropTypes.array.isRequired,
  		carts_temp: React.PropTypes.array.isRequired
	}),
	actions: React.PropTypes.object
};


export default Cart;