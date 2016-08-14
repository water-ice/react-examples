import React, { Component , PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../../../constants/actions/home';
import * as HomeActions from '../../../actions/request';
class Home extends Component {
	componentWillMount(){
		if(this.props.home._fetch === 0){
			let url = actions.HOME_GET_MAIN;
			let param = {
				v:new Date().getTime()
			};

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
      		<div className="views-home">
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