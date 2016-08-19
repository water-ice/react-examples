import React, {
	Component,
	PropTypes
} from 'react';
import * as types from '../../../constants/actions/home';
/*ant*/
import {
	Toast,
	WhiteSpace,
	WingBlank,
	Button
} from 'antd-mobile';
class Home extends Component {
	componentWillMount() {
		if (this.props.home.isLoading === 0) {
			let url = types.HOME_GET_MAIN;
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
			<div className="views-home" onClick={()=>{Toast.loading('加载中...',0);}}>
      		2222
      		</div>
		);
	}
}

Home.propTypes = {};

export default Home;