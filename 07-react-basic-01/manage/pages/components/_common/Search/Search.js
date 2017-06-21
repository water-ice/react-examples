import React, { Component, PropTypes } from 'react';
import {Link} from 'react-router';
import { Input, Button } from 'antd';
import classnames from 'classnames';
import './Search.scss';
import pureRender from 'pure-render-decorator';
@pureRender
class Search extends Component {
	constructor(props) {
		super(props);
		this.handleSearch = ::this.handleSearch;
	}
	handleSearch(event) {
		const value = event.target.value || this.refs.input$.refs.input.value;
		this.props.onSearch&&this.props.onSearch(value);
	}
	render() {
		const {
			placeholder,
			inputWidth,
			className,
			queryKeyword
		} = this.props;
		return (
			<div className={classnames(("common-search g-flex g-pd"),className)}>
				{this.props.children}
				<Input
					ref="input$"
					defaultValue={queryKeyword||''}
					placeholder={placeholder} 
					style={{width:inputWidth}} 
					onPressEnter={this.handleSearch}
				/>
				<Button 
					htmlType="submit"
					type="primary"
					onClick={this.handleSearch}
				>搜索</Button>
			</div>
		);
	}
}
Search.PropTypes={
	placeholder:PropTypes.string,
	className:PropTypes.string,
	onSearch:PropTypes.func,
};
Search.defaultProps = {
	inputWidth: 200,
	placeholder: "请输入关键字"
};
export default Search;