import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import ItemTypes from '../ItemTypes';

const style = {
	border: '1px dashed gray',
	backgroundColor: 'white',
	padding: '0.5rem 1rem',
	marginRight: '1.5rem',
	marginBottom: '1.5rem',
	cursor: 'move',
	float: 'left',
};

const spec = {
	beginDrag(props) {
		return {
			name: props.name,
		};
	},

	endDrag(props, monitor) {
		const item = monitor.getItem();
		const dropResult = monitor.getDropResult();
		const { type, onAdd } = props;
		// 增加列表
		onAdd&&onAdd(type);

		if (dropResult) {
			console.log(`You dropped ${item.name} into ${dropResult.name}!`);
		}
	},
};
const collect = (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging(),
});
@DragSource(ItemTypes.Tools, spec, collect)
class Child extends Component {
	static propTypes = {
		connectDragSource: PropTypes.func.isRequired,
		isDragging: PropTypes.bool.isRequired,
		name: PropTypes.string.isRequired,
	};
	render() {
		const { isDragging, connectDragSource } = this.props;
		const { name } = this.props;
		const opacity = isDragging ? 0.4 : 1;

		return (
			connectDragSource(
				<div style={{ ...style, opacity }}>
					{name}
				</div>,
			)
		);
	}
}

export default Child;

