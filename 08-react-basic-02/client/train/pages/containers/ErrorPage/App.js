import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Result } from 'antd-mobile';
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
		/**
		 * 微信坑
		 * hack。否则每次都要进这里
		 */
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
			<Result
				imgUrl="https://os.alipayobjects.com/rmsportal/XMUAssczvVftDHX.png"
				title="数据出错了"
				brief="请查看网络连接或稍后重试"
				buttonText="返回"
				buttonType="primary"
				buttonClick={() =>setTimeout(()=> _global.history.goBack(),100)}
			/>
		);
	}
}
export default ResultPage;