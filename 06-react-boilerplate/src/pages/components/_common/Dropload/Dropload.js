import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';


@pureRender
export default class Spinner extends Component {

	constructor(props, context) {
		super(props, context);
		this.state = {
			
		};
	}

	componentWillMount() {
		
	}

	componentDidMount() {
		
	}

	render() {

		console.log('render spinner loading');
		/*
			0:上拉加载；
			1:加载中;
			2:加载完成
		*/
		//let isState = this.props.isState;
		let isState = 0;

		let loadingText = {
			0:"上拉加载",
			1:"加载中",
			2:"已全部加载"
		};
		return (
			<div className="dropload-down">
				<div className="dropload-load">
					{
						isState==1&&<span className="loading"></span>
					}
					{loadingText[isState]}
				</div>
			</div>
		);
	}
}