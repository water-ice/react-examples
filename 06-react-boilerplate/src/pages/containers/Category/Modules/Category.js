import React, { Component, PropTypes } from 'react';
import * as types from '../../../constants/actions/category';
/*ant*/
import { Toast } from 'antd-mobile';
class Category extends Component {
	componentWillMount() {
		if (this.props.category.main.isFetching === 0) {
			let url = types.CATEGORY_MAIN_GET;
			let param = {};

			let params = {
				param: param,
				ajaxType: 'GET',
				onSuccess: function(data) {
					// console.log(data);
				},
				onError: function(res) {
					console.log("err");
				}
			};

			this.props.actions.request(url, params, {});
		}
	}
	render() {
		return (
			<div>
				test
      		</div>
		);
	}
}

Category.propTypes = {};

export default Category;