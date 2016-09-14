import React, { Component, PropTypes } from 'react';
import * as types from '../../constants/actions/category';
import Scroll from '../_common/Scroll/Scroll';
import List from './List';
import './ScrollList.scss';

import pureRender from 'pure-render-decorator';
@pureRender
class ScrollList extends Component {
	constructor(props, context) {
		super(props, context);
		this.loadDataForScroll = this.loadDataForScroll.bind(this);//加载数据
    }
    loadDataForScroll(){
    	const {
    		curId,
    		dataRight
    	} = this.props;
    	if(dataRight.isEnd>0){ //只有状态为0时才可以加载数据
    		return false;
    	}
		let url = types.CATEGORY_MAIN_LIST_GET;
		let param = {
			page:dataRight.curPage+1,
			cat_id:curId
		};
		let params = {
			param: param,
			ajaxType: 'GET',
			onSuccess: function(data) {
				//console.log(data);
			},
			onError: function(res) {
			}
		};
		this.props.actions.request(url, params, {});
    }
	render(){
		const{
			curId,
			dataRight
		} = this.props;
		const{
			itemArr,
			itemObj,
			curPage,
			isEnd
		} = dataRight;
		return (
		    <Scroll wrapper={`.category-goods`}
  				scrollClass={`w-col-9 w-bg-white`}
  				scrollStyle={{height:_global.innerHeight}}
  				ref="scroll"
  				loadDataForScroll={this.loadDataForScroll}
  				curPage = {curPage}
  				isEnd={isEnd}
  				show = {true}

  				resetPrvScrollTop={curId}
	  		>
	  			<List itemArr={itemArr}
	  				  itemObj={itemObj}
	  			/>
  			</Scroll>
		);
	}
}

ScrollList.propTypes = {};

export default ScrollList;