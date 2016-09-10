import React, { Component, PropTypes } from 'react';
import * as types from '../../../constants/actions/order.js';
import pureRender from 'pure-render-decorator';
import Scroll from '../../_common/Scroll/Scroll';
import List from './List';
@pureRender
class ScrollList extends Component {
	constructor(props, context) {
		super(props, context);
		this.loadDataForScroll = this.loadDataForScroll.bind(this);//加载数据
    }
    loadDataForScroll(){
    	const {
    		show,
    		type,
    		listInfo
    	} = this.props;
    	console.log(this.props);
    	if(show&&listInfo.isEnd>0){ //只有状态为0时才可以加载数据
    		return false;
    	}
		let url = types.ORDER_GET_LIST;
		let param = {
			page:listInfo.curPage+1,
			type:type
		};
		let params = {
			param: param,
			ajaxType: 'GET',
			onSuccess: function(data) {
				console.log(data);
			},
			onError: function(res) {
			}
		};
		this.props.actions.request(url, params, {});
    }
	render() {
		const {
			show,
			type,
			listInfo
		} = this.props;
	  	return (
		  		<Scroll wrapper={`.scroll-wrap-content`}
		  				scrollStyle={{height:_global.innerHeight-88,paddingTop:15}}
		  				ref="scroll"
		  				loadDataForScroll={this.loadDataForScroll}
		  				curPage = {listInfo.curPage}
		  				show={show}
		  				isEnd={listInfo.isEnd}

		  		>
		  			<List show={show}/>
		  		</Scroll>
	  	);
	}
}
export default ScrollList;