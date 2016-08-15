import React, { Component , PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as types from '../../../constants/actions/home';
import * as HomeActions from '../../../actions/home';

/*ant*/
import { Toast, WhiteSpace, WingBlank, Button } from 'antd-mobile';
class Home extends Component {
	componentWillMount(){
		if(this.props.home._fetch === 0){
			let url = types.HOME_GET_MAIN;
			let param = {};

			let params = {
				param : param,
				ajaxType: 'GET',
				onSuccess: function(data) {
					// console.log(data);
				},
				onError: function(res) {
					console.log("err");
				}
			};

			this.props.actions.request( url, params,{});
		}
	}
	render() {
		return (
      		<div className="views-home" onClick={()=>{Toast.loading('加载中...',0)}}>
      		2222
      		</div>
		);
	}
}

Home.propTypes = {};

function mapStateToProps(state) {
	return {
		home: state.home
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(HomeActions, dispatch)
	};
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);