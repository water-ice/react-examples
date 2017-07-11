import React, { Component } from 'react';
import PropTypes from 'prop-types';
import pureRender from 'pure-render-decorator';
import { Input } from 'antd';
@pureRender
class Edit extends Component {
	constructor(props, context) {
		super(props, context);
		this.handleChangeTip = ::this.handleChangeTip;
		this.handleChangeTitle = ::this.handleChangeTitle;
	}
	handleChangeTip(e){
		const { item, itemData } = this.props; 
		const value = e.target.value;
		this.props.onEdited(item, {...itemData, tip: value || ""});
	}
	handleChangeTitle(e){
		const { item, itemData } = this.props; 
		const value = e.target.value;
		this.props.onEdited(item, {...itemData, title: value || ""});
	}
	render() {
		const { itemData = {} } = this.props; 
		return (
			<div>
				<h3 className="g-pd-tb">标题</h3>
				<Input 
					type="text"
					value={itemData.title}
					onChange={this.handleChangeTitle}
				/>
				<h3 className="g-pd-tb">提示文字</h3>
				<Input 
					type="text"
					value={itemData.tip}
					onChange={this.handleChangeTip}
				/>
			</div>
		);
	}
}
Edit.propTypes = {
};
export default Edit;