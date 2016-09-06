import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';
import classnames from 'classnames';
import {Toast} from 'antd-mobile';
import * as types from '../../../constants/actions/order';
@pureRender
class LogisPopupItem extends Component {
	constructor(props, context) {
		super(props, context);
		this.handleLogis = this.handleLogis.bind(this); 
	}
	handleLogis(event){
		const {item,itemData,selectId,onShow} = this.props;
		const selected = selectId == item;
		if(selected){
			onShow&&onShow();
		}else{
			Toast.loading(null,0);
			let url = types.ORDER_PUT_LOGIS_MAIN;
			let param = {...itemData};
			let params = {
				param: param,
				ajaxType: 'PUT',
				onSuccess: function(data) {
					Toast.hide();
					onShow&&onShow();
				},
				onError: function(res) {
					Toast.hide();
					alert('error');
				}
			};
			this.props.actions.request(url, params, {});
		}
	}
	render() {
		const {item,itemData,selectId} = this.props;
		const selected = selectId == item;
		const {
			name,
			price
		} = itemData;
		return (
			<div className="w-row w-pd w-bb" onClick={this.handleLogis}>
				<i className={
				                classnames(
				                    "iconfont w-col-2 w-tc w-fs-40",
				                    (selected? "icon-circle-select w-orange" : "icon-not-select")
				                )
				            }
				/>
				<div className="w-col-10 w-tr">
					<i>{name} </i>
					<i className="w-pd-l w-orange">{price}</i>
				</div>
			</div>
		);
				
	}
}
LogisPopupItem.propTypes = {
	actions: React.PropTypes.object,
	onShow: React.PropTypes.func,
	itemData: React.PropTypes.object,
	item: React.PropTypes.string,
	selectId: React.PropTypes.string,
};
export default LogisPopupItem;