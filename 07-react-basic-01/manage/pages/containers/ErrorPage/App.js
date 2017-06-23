import React, { Component } from 'react';
import PropTypes from 'prop-types';
/**
 * [结果页]
 * @param  {[Object]} props 
 * @return [返回三个按钮，一个跳转到用户端，一个跳转代理端，一个返回]，目前只做了返回
 */
class ResultPage extends Component {
	constructor(props, context) {
		super(props, context);
		this.state={
			show:false
		};
	}
	componentWillMount(){
		this.interval = setTimeout(()=>{
			this.setState({
				show:true
			});
		}, 300);
	}
	componentWillUnmount() {
		this.interval&&clearTimeout(this.interval);
	}
	render() {
		const {...rest} = this.props;
		if(!this.state.show){
			return null;
		}
		return(
			<div>错误</div>
		);
	}
}
export default ResultPage;