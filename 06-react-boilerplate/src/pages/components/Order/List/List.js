import React, { Component, PropTypes } from 'react';
import Item from './Item';
import pureRender from 'pure-render-decorator';
@pureRender
class List extends Component {
	constructor(props, context) {
		super(props, context);
    }
	render() {
		const {
			show,
			itemArr,
			itemObj
		} = this.props;
	  	return (
	  		<div>
	  			{itemArr.map((item,index)=>{
	  				return(
	  					<Item key = {`${item}_${index}`}
	  						  itemData= {itemObj[item]}
	  					/>
  					);
	  			})}
	  		</div>
	  	);
	}
}
/*无状态组件*/
/*const List= (props)=> {
	const {
		show,
		itemArr,
		itemObj
	} = props;
  	return (
  		<div>
  			{itemArr.map((item,index)=>{
  				return(
  					<Item key = {`${item}_${index}`}
  						  itemData= {itemObj[item]}
  					/>
					);
  			})}
  		</div>
  	);
};*/
export default List;