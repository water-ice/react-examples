import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Item from './Item';

const List = (props) => {
	const { actions, itemArr, itemObj } = props;
	return (
		<div>
			{
				itemArr.map((item, index) => {
					return (
						<Item 
							key={`${item}`} 
							itemData={itemObj[item]}
							actions={actions}
						/>
					);
				})
			}
		</div>
	);
};
export default List;
