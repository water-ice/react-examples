import React, { Component, PropTypes } from 'react';
import ListTabs from '../../../components/Order/List/ListTabs.js';
class OrderList extends Component {
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
OrderList.propTypes = {
	order: React.PropTypes.shape({
		main :React.PropTypes.object
	}),
	actions: React.PropTypes.object
};

export default OrderList;