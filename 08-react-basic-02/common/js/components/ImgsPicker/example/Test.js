import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImgsPicker from '../ImgsPicker';
import img_1 from './img/1.jpg';
const imgs = [img_1];
class Test extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		return (
			<div>
				<ImgsPicker 
					imgs={imgs}
					limit={5}
					ref="picker"
				/>
			</div>
		);
	}
}
Test.propTypes = {
};
export default Test;