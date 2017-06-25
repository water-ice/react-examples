import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from '../../../ItemTypes';

const style = {
	border: '1px dashed gray',
	padding: '0.5rem 1rem',
	marginBottom: '.5rem',
	backgroundColor: 'white',
	cursor: 'move',
	width: '10rem'
};


const specSource = {
	beginDrag(props) { // 传递给item中的monitor
		return {
			item: props.item,
			originalIndex: props.onFind(props.item)
		};
	},

	endDrag(props, monitor) {
		const { originalIndex } = monitor.getItem();
		const didDrop = monitor.didDrop();
		// if (!didDrop) {
		// 	props.onMove(props.item, originalIndex);
		// }
	}
};
const specTarget = {
	canDrop() {
		return false; // 设置它禁止拖拽，只让Source可拖拽
	},

	hover(props, monitor) {
		const { item: draggedItem } = monitor.getItem();
		const { item: overItem } = props;
		if (draggedItem !== overItem) {
			const overIndex = props.onFind(overItem);
			props.onMove(draggedItem, overIndex);
		}
	},
};

@DropTarget(ItemTypes.Moduels, specTarget, connect => ({
	connectDropTarget: connect.dropTarget(),
}))
@DragSource(ItemTypes.Moduels, specSource, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging(),
}))
class Radio extends Component {
	static propTypes = {
		connectDragSource: PropTypes.func.isRequired,
		connectDropTarget: PropTypes.func.isRequired,
		isDragging: PropTypes.bool.isRequired,
	};
	render() {
		const { isDragging, connectDragSource, connectDropTarget } = this.props;
		const { item, itemData } = this.props;
		const opacity = isDragging ? 0 : 1;
		return connectDragSource(connectDropTarget(
			<div style={{ ...style, opacity }} onClick={()=>{onEdit(item);}}>
				<input type="radio" placeholder={item} disabled/>
			</div>,
		));
	}
}


export default Radio;

