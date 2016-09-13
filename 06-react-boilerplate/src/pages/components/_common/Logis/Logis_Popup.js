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
			const {logis_type,aid} = this.props;
			let param = {
				type:logis_type,//运费模版，
				aid,
			};
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
			        return !1;
			    }
			});
		}
	}
	render() {
		const {show,onShow,selectId,actions,logis_type} = this.props;
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
			        			  logis_type = {logis_type}
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
	selectId:React.PropTypes.string
};
export default LogisPopup;