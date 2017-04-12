import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';
import './Dropload.scss';
@pureRender
class Dropload extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		/*
			0:上拉加载；
			1:加载中;
			2:加载完成
		*/
		const {isEnd} = this.props;

		const loadingText = {
			0:"上拉加载",
			1:"加载中",
			2:"已全部加载",
			3:"数据异常，请刷新重试"
		};
		return (
			<div className="dropload-down">
				<div className="dropload-load">
					{
						isEnd==1&&<span className="loading"></span>
					}
					<span>{loadingText[isEnd]}</span>
				</div>
			</div>
		);
	}
}

export default Dropload;