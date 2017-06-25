import React, { Component } from 'react';
import PropTypes from 'prop-types';
import pureRender from 'pure-render-decorator';
@pureRender
class Edit extends Component {
	constructor(props, context) {
		super(props, context);
		this.handleChange = ::this.handleChange;
	}
	handleChange(e){
		const { item } = this.props; 
		const value = e.target.value;
		this.props.onChange(item, value);
	}
	render() {
		const { itemData = {} } = this.props; 
		return (
			<div>
				<h3>请编辑</h3>
				<input 
					type="text"
					value={itemData.placeholder}
					onChange={this.handleChange}
				/>
			</div>
		);
	}
}
Edit.propTypes = {
};
export default Edit;