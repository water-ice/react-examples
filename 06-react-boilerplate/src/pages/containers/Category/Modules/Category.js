import React, { Component, PropTypes } from 'react';
import * as types from '../../../constants/actions/category';
/*ant*/
import { Toast } from 'antd-mobile';
import Nav from '../../../components/Category/Nav';
import Goods from '../../../components/Category/Goods';
class Category extends Component {
	constructor(props,context) {
	    super(props,context);
	}
	render() {
		return (
			<div className="w-row w-reset">
				<Nav />
				<Goods />
      		</div>
		);
	}
}

Category.propTypes = {};

export default Category;