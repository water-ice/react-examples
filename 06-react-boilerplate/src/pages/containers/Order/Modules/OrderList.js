import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import * as types from '../../../constants/actions/order';
/*ant*/
import { Toast } from 'antd-mobile';
/**/
import Main from '../../../components/Order/List/Main';
class Order extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		const {...rest} = this.props;
		return (
			<div className="w-reset">
				<Main {...rest}/>
      		</div>
		);
	}
}

Order.propTypes = {
	order: React.PropTypes.shape({
		main :React.PropTypes.object
	}),
	actions: React.PropTypes.object
};

export default Order;