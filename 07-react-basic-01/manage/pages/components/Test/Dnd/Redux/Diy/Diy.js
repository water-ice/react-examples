import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from '../ItemTypes';
import Modules from './Modules/Modules';

const style = {
	cursor: 'move'
};
const styleDel = {
	background: "#108ee9",
	position: "absolute",
	right: 0,
	width: "20px",
	color: "white",
	textAlign: "center"
};
const specSource = {
	beginDrag(props) { // 传递给item中的monitor
		props.onEditing(null);
		return {
			item: props.item,
			originalIndex: props.onFind(props.item)
		};
	},

	endDrag(props, monitor) {
		const { originalIndex } = monitor.getItem();
		const didDrop = monitor.didDrop();
		// if (!didDrop) {
		// 	props.onSorted(props.item, originalIndex);
		// }
	}
};
let timer = null;
const specTarget = {
	canDrop() {
		return false;
	},

	hover(props, monitor) {
		const { item: overItem, toolsDragging } = props;
		if(toolsDragging) {
			// 如果tools在拖拽，不排序
			props.onSorting(overItem);
			// 如果移除，则默认插入到最后一个
			timer&&clearTimeout(timer);
			timer = setTimeout(() => {
				props.onSorting(null);
			}, 100);
			return;
		} 
		const { item: draggedItem } = monitor.getItem();
		if (draggedItem !== overItem) {
			const overIndex = props.onFind(overItem);
			props.onSorted(draggedItem, overIndex);
		}
	}
};

@DropTarget(ItemTypes.Moduels, specTarget, connect => ({
	connectDropTarget: connect.dropTarget(),
}))
@DragSource(ItemTypes.Moduels, specSource, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging(),
}))
class SourceTarget extends Component {
	static propTypes = {
		connectDragSource: PropTypes.func.isRequired,
		connectDropTarget: PropTypes.func.isRequired,
		isDragging: PropTypes.bool.isRequired,
	};
	constructor(props){
		super(props);
		this.handleClick = ::this.handleClick;
		this.handleEnter = ::this.handleEnter;
		this.handleLeave = ::this.handleLeave;
		this.handleDel = ::this.handleDel;
		this.state = {
			hover: false
		};
	}
	handleClick(){
		const { item, editing } = this.props;
		this.props.onEditing(item);
	}
	handleEnter(){
		this.setState({
			hover: true
		});
	}
	handleLeave(){
		this.setState({
			hover: false
		});
	}
	handleDel(event){
		event.stopPropagation(); // 阻止事件冒泡
		const { item, editing } = this.props;
		// 先去除编辑
		editing === item && this.props.onEditing(null);
		// 删除
		this.props.onDel(item);
	}
	render() {
		const { isDragging, connectDragSource, connectDropTarget } = this.props;
		const { item, lastItem, itemData, onEditing, onDel, editing, toolsDragging, sorting  } = this.props;
		const { hover } = this.state;
		const opacity = isDragging ? 0 : 1;
		let border = hover ? "1px dashed #108ee9": "none";
		border = editing === item ? "1px solid #108ee9" : border;
		return (
			<div>
				{
					(toolsDragging&&sorting == item)&&
						<div style={{height: 2, background: "red", marginBottom: -2}} />
				}
				{
					connectDragSource(connectDropTarget(
						<div 
							style={{ ...style, opacity, border }} 
							onClick={this.handleClick} 
							className="g-pos-r"
							onMouseEnter={this.handleEnter}
							onMouseLeave={this.handleLeave}
						>
							{
								hover&&
									<p 
										style={styleDel} 
										onClick={this.handleDel} 
									>x</p>
							}
							<Modules item={item} itemData={itemData} />
						</div>
					))
				}
				{
					(lastItem&&toolsDragging&&sorting == null)&&
						<div style={{height: 2, background: "red"}} />
				}
			</div>
		);
	}
}
SourceTarget.propTypes = {

};
export default SourceTarget;
