import React, { Component, PropTypes } from 'react';
import * as types from '../../../constants/actions/user';
import Footer from '../../../components/Footer/Footer';
import Header from '../../../components/User/Header';
import Order from '../../../components/User/Order';
import List from '../../../components/User/List';
/*ant*/
import {Toast} from 'antd-mobile';
import './User.scss';
class Home extends Component {
	constructor(props,context) {
	    super(props,context);
	}
	componentWillMount() {
		if (this.props.user.main.isFetching === 0) {
			let url = types.USER_GET_MAIN;
			let param = {};
			let params = {
				param: param,
				ajaxType: 'GET',
				onSuccess: function(data) {
					// console.log(data);
				},
				onError: function(res) {
					console.log("errs");
				}
			};

			this.props.actions.request(url, params, {});
		}
	}
	render() {
		const {
			user,
			order
		} = this.props.user.main;
		return (
			<div>
				<Header {...user}/>
				<Order {...order} />
				<List />
				<Footer />
      		</div>
		);
	}
}

Home.propTypes = {};

export default Home;