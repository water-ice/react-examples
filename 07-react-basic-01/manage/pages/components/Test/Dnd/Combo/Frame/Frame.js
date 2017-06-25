import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import ItemTypes from '../ItemTypes';
import Diy from '../Diy/Diy';

const style = {
	height: '30rem',
	width: '12rem',
	overflow: "scroll",
	marginRight: '1.5rem',
	marginBottom: '1.5rem',
	color: 'white',
	padding: '1rem',
	textAlign: 'center',
	fontSize: '1rem',
	lineHeight: 'normal',
	float: 'left',
};

const spec = {
	drop() {
		return { name: 'Frame' };
	},
};
const collect = (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver(),
	canDrop: monitor.canDrop(),
});
@DropTarget(ItemTypes.Tools, spec, collect)
class Frame extends Component {
	static propTypes = {
		connectDropTarget: PropTypes.func.isRequired,
		isOver: PropTypes.bool.isRequired,
		canDrop: PropTypes.bool.isRequired,
	};
	render() {
		const { canDrop, isOver, connectDropTarget } = this.props;
		const { itemObj, itemArr, onFind, onMove, onEdit } = this.props;
		const isActive = canDrop && isOver;

		let border = '1px solid #222';
		if (isActive) {
			border = '1px solid darkgreen';
		} else if (canDrop) {
			border = '1px solid darkkhaki';
		}
		console.log(itemArr);
		return connectDropTarget(
			<div style={{ ...style, border }}>
				{
					itemArr.map((item, index)=>{
						return (
							<Diy 
								key={`${item}`} //不要变化，否则影响排序R
								item={item}
								itemData = {itemObj[item]}
								onFind = {onFind}
								onMove = {onMove}
								onEdit = {onEdit}
							/>
						);
					})
				}
			</div>,
		);
	}
}

export default Frame;
