import React, { Component, PropTypes } from 'react';
import * as types from '../../../constants/actions/user';
/*ant*/
import {Toast} from 'antd-mobile';
import './UserAddr.scss';
class UserAddr extends Component {
	constructor(props,context) {
	    super(props,context);
	}
	componentWillMount() {
		if (this.props.user.addr.isFetching === 0) {
			let url = types.USER_ADDR_GET;
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
		return (
			<div>
				test
      		</div>
		);
	}
}

UserAddr.propTypes = {};

export default UserAddr;