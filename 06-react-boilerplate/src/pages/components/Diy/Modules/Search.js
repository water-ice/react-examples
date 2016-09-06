import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import pureRender from 'pure-render-decorator';
import { SearchBar } from 'antd-mobile';
@pureRender
class Title extends Component {
	constructor(props, context) {
		super(props, context);
		this.state={
			value:""
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
	onChange(value) {
	   this.setState({ value });
 	}
 	onSubmit(value){
 		alert(value);
 	}
	render() {
		const {m_tb} = this.props;
		return (
			<div className="diy-conitem" style={{margin:m_tb+" 0"}}>
			     <SearchBar
			       value={this.state.value}
			       placeholder="搜索"
			       onCancel={this.onSubmit}
			       onSubmit={this.onSubmit}
			       cancelText="搜索"
			       onChange={this.onChange}
			     />
		    </div>
	   	);
	}
}
Title.propTypes = {

};
export default Title;