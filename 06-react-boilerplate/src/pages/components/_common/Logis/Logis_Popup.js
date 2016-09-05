import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';
import net from 'net';
import API_ROOT from 'apiRoot';
import {initItem} from 'utils';
import {Toast} from 'antd-mobile';
import Item from './Logis_Item';
@pureRender
class LogisPopup extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			itemArr :[],
			itemObj :{}
		};
	}
	componentWillReceiveProps(nextProps){
		//console.log(nextProps);
		if(nextProps.show){
			/*异步请求数据，不放入redux*/
			let param = {};
			Toast.loading(null, 0);
			net.ajax({
			    url: API_ROOT['_LOGIS_GET_LIST'],
			    type: 'GET',
			    param,
			    success: (res) => {
			        Toast.hide();
			        this.setState({
			        	...initItem(res)
			        });
			    },
			    error: (res) => {
			        reject();
			        return !1;
			    }
			});
		}
	}
	render() {
		const {show,onShow,selectId,actions} = this.props;
		if (!show) {
		    return null;
		}
		return (
			<div className="w-reset">
			    <div className="w-bg-fixed" onClick={onShow}></div>
			    <div className="w-bg-white w-fixed w-row">
				    <p className="w-close-position">
				    	选择配送方式<i className="iconfont icon-close" onClick={onShow} />
				    </p>
			    	<div className="w-height-600 w-pd-lr">
			        {this.state.itemArr.map((item,index)=>{
			        	let itemData = this.state.itemObj[item];
			        	return (
			        		<Item key={item}
			        			  item = {item}
			        			  itemData = {itemData}
			        			  selectId = {selectId}
			        			  actions  = {actions}
			        			  onShow  = {onShow}
			        		/>
			        	);
			        })}
			        </div>
			    </div>
			</div>
		);
				
	}
}
LogisPopup.propTypes = {
	show:React.PropTypes.bool,
	onShow:React.PropTypes.func,
	actions:React.PropTypes.object,
	selectId:React.PropTypes.number
};
export default LogisPopup;