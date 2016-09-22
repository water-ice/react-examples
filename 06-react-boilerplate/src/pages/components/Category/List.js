import React, { Component, PropTypes } from 'react';
import Item from './Item';
/*无状态组件*/
const List = (props) => {
    const {
        itemArr,
        itemObj
    } = props;
    return ( 
    	<div> 
	    	{
	    		itemArr.map((item, index) => {
	                return ( 
	                	<Item 
                            key={`${item}_${index}`}
                		    itemData={itemObj[item]}
	                    />
	                );
	            })
	        } 
        </div>
    );
};
export default List;