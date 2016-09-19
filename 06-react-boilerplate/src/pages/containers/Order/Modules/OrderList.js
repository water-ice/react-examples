import React, { Component, PropTypes } from 'react';
import ListTabs from '../../../components/Order/List/ListTabs.js';
class Order extends Component {
	constructor(props, context) {
		super(props, context);
	}
	
	render() {
		const {...rest} = this.props;
		return (
			<ListTabs {...rest} />
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