import React, { Component } from 'react';
import PropTypes from 'prop-types';
class Input extends Component {
	render() {
		const {itemData} = this.props;
		return (
			<div className="g-flex g-fd-c">
				<p className="g-pd-l g-pd">{itemData.title}<span className="g-pink">*</span></p>
				<p className="g-bg-white g-pd">{itemData.tip}</p>
			</div>
		);
	}
}


export default Input;