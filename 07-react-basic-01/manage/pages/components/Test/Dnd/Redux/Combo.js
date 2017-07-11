import React, { Component } from 'react';
import update from 'react/lib/update';
import PropTypes from 'prop-types';
import pureRender from 'pure-render-decorator';
import Tools from './Tools/Tools';
import Frame from './Frame/Frame';
import DiyEdit from './Diy/DiyEdit';
@pureRender
class Combo extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			// 编辑的栏目
			editing: null,
			// tools 是否处于拖拽状态
			toolsDragging: false,
			// 排序的内容
			sorting: null

		};
		this.getItemIndex = ::this.getItemIndex;
		this.handleDragging = ::this.handleDragging;
		this.handleAdd = ::this.handleAdd;
		this.handleSorted = ::this.handleSorted;
		this.handleSorting = ::this.handleSorting;
		this.handleEditing = ::this.handleEditing;
		this.handleEdited = ::this.handleEdited;
		this.handleDel = ::this.handleDel;
	}
	getItemIndex(value){
		const { data: { itemArr, itemObj } } = this.props;
		return itemArr.findIndex(item => item === value);
	}
	handleDragging(toolsDragging){
		this.setState({
			toolsDragging,
			sorting: null
		});
	}
	handleAdd(type, sorting){
		const atIndex = this.getItemIndex(sorting);
		this.props.actions.dndAdd(type, atIndex >= 0 ? atIndex : null);
	}
	handleSorted(item, atIndex){
		this.props.actions.dndSort(item, atIndex);
	}
	handleSorting(sorting){
		sorting != this.state.sorting && this.setState({
			sorting: sorting || null
		});
	}
	handleEditing(item){
		this.setState({
			editing: item
		});
	}
	handleEdited(item, data){
		this.props.actions.dndEdit(item, data);
	}
	handleDel(item){
		this.props.actions.dndDel(item);
	}
	render() {
		const { editing, sorting, toolsDragging } = this.state;
		const { data: { itemArr, itemObj } } = this.props;
		return (
			<div className="g-flex">
				<Tools 
					onAdd={this.handleAdd}
					onDragging={this.handleDragging}
					sorting={sorting}
				/>
				<Frame 
					itemArr={itemArr}
					itemObj={itemObj}
					onFind={this.getItemIndex}
					onDel={this.handleDel}
					onSorted={this.handleSorted}
					onSorting={this.handleSorting}
					onEditing={this.handleEditing}
					onDragging={this.handleDragging}
					toolsDragging={toolsDragging}
					editing={editing}
					sorting={sorting}
				/>
				<DiyEdit 
					item={editing} 
					itemData={itemObj[editing]} 
					onEdited={this.handleEdited}
				/>
			</div>
		);
	}
}
Combo.propTypes = {
};
export default Combo;