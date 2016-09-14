import React, { Component, PropTypes } from 'react';
import * as types from '../../../constants/actions/category';
/*ant*/
import { Toast } from 'antd-mobile';
import Nav from '../../../components/Category/Nav';
import ScrollList from '../../../components/Category/ScrollList';
class Category extends Component {
	constructor(props,context) {
	    super(props,context);
	}
	componentWillMount() {
		console.log('componentWillMount');
		if (this.props.category.main.isFetching === 0) {
			Toast.loading(null, 0);
			let url = types.CATEGORY_MAIN_GET;
			let param = {};

			let params = {
				param: param,
				ajaxType: 'GET',
				onSuccess: (res) => {
					Toast.hide();
					//this.props.history.pushState(null, '/');
				},
				onError: (res) => {
					Toast.hide();
					alert('error');
					/*Toast.info(res.msg,3,()=>{
						//this.props.history.pushState(null, '/');
					});*/
				}
			};
			this.props.actions.request(url, params, {});
		}
	}
	render() {
		const {category,actions} = this.props;
		const{
			dataLeft,
			dataRight,
			curId,
		} = category.main;
		return (
			<div className="w-row w-reset" style={{overflow:'hidden'}}>
				<Nav dataLeft={dataLeft} curId={curId} actions={actions}/>
				{curId&&<ScrollList curId={curId} dataRight={dataRight[curId]} actions={actions} />}
      		</div>
		);
	}
}

Category.propTypes = {};

export default Category;