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
			editing: null,
			itemArr: [],
			itemObj: {}
		};
		this.handleAdd = ::this.handleAdd;
		this.handleFind = ::this.handleFind;
		this.handleMove = ::this.handleMove;
		this.handleEdit = ::this.handleEdit;
		this.handleChange = ::this.handleChange;
		// 表示数量
		this.inputCount = 0;
		this.radioCount = 0;
	}
	handleAdd(type){
		const { itemArr,itemObj } = this.state;
		let item;
		switch(type) {
			case "input":
				item = `input#${this.inputCount}`;
				this.setState({
					itemArr: [...itemArr, item],
					itemObj: {
						...itemObj,
						[item]:{
							placeholder: "自定义" + item
						}
					}
				});
				this.inputCount ++ ;
				break;
			case "radio":
				item = `radio#${this.radioCount}`;
				this.setState({
					itemArr: [...itemArr, item],
					itemObj: {
						...itemObj,
						[item]:{
							placeholder: "自定义" + item
						}
					}
				});
				this.radioCount ++ ;
				break;
			default:
				return null;
		}
	}
	handleFind(value){
		const { itemArr,itemObj } = this.state;
		return itemArr.findIndex(item => item === value);
	}
	handleMove(item,atIndex){
		const index = this.handleFind(item);
		this.setState(update(this.state, {
			itemArr: {
				$splice: [
					[index, 1],
					[atIndex, 0, item],
				],
			},
		}));
	}
	handleEdit(item){
		this.setState({
			editing: item
		});
	}
	handleChange(item, value){
		this.setState({
			itemObj: {
				...this.state.itemObj,
				[item]:{
					placeholder: value
				}
			}
		});
	}
	render() {
		const { editing, itemArr,itemObj } = this.state;
		return (
			<div className="g-flex">
				<Tools 
					onAdd={this.handleAdd}
				/>
				<Frame 
					itemArr={itemArr}
					itemObj={itemObj}
					onFind={this.handleFind}
					onMove={this.handleMove}
					onEdit={this.handleEdit}
				/>
				<DiyEdit item={editing} itemData={itemObj[editing]} onChange={this.handleChange}/>
			</div>
		);
	}
}
Combo.propTypes = {
};
export default Combo;