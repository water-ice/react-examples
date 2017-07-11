import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Radio extends Component {
	render() {
		const { item, itemData } = this.props;
		return (
			<input type="radio" placeholder={item} disabled/>
		);
	}
}


export default Radio;

