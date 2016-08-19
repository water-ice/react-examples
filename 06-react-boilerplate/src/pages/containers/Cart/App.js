import {
	bindActionCreators
} from 'redux';
import {
	connect
} from 'react-redux';
import * as CartActions from '../../actions/cart';

import Cart from './Modules/Cart';

function mapStateToProps(state) {
	return {
		cart: state.cart
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(CartActions, dispatch)
	};
}
/*错误页面时，可以直接暴露一个404的组件页面*/
export default connect(mapStateToProps, mapDispatchToProps)(Cart);