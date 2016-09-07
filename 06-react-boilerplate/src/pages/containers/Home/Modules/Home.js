import React, { Component, PropTypes } from 'react';
import * as types from '../../../constants/actions/home';
import Footer from '../../../components/Footer/Footer';
/*ant*/
import {Toast} from 'antd-mobile';
import Diy from '../../../components/Diy/Diy';
class Home extends Component {
	componentWillMount() {
		if (this.props.home.main.isFetching === 0) {
			Toast.loading(null,0);
			let url = types.HOME_GET_MAIN;
			let param = {};
			let params = {
				param: param,
				ajaxType: 'GET',
				onSuccess: function(data) {
					Toast.hide();
				},
				onError: function(res) {
					alert('error');
					Toast.hide();
				}
			};
			this.props.actions.request(url, params, {});
		}
	}
	render() {
		const {home} = this.props;
		const {
			itemArr,
			itemObj,
			shop,
			header
		} = home.main;
		return (
			<div>
				{itemArr.map((item,index)=>{
					return (
						<Diy key={`${item}-${index}`} 
							 item={item}
							 itemData = {itemObj[item]}
						/>
					);
				})}
				<Footer />
      		</div>
		);
	}
}

Home.propTypes = {};

export default Home;