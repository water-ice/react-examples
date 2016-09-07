import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import pureRender from 'pure-render-decorator';
@pureRender
class Tpl extends Component {
	constructor(props, context) {
		super(props, context);
		this.handleVoice = this.handleVoice.bind(this);
		this.state ={
			status:!1,//是否正在完成
			load:!1,//是否加载完成
			player:!1//是否正在播放
		};
	}
	handleVoice(){
		if(!this.state.load){
			this.setState({
				status:!0//正在加载
			});
			const {
				mp3,
			} = this.props;
			let audio = new Audio();
			audio.loop = true;
			audio.src = mp3;
			audio.onloadedmetadata = ()=>{
				audio.play();
				this.setState({
					status:!1,
					load:!0,
					player:!0
				});
			};
		}else{
			this.setState({
				player:!this.state.player
			});
		}
	}
	render() {
		const {
			m_tb,
			img,
		} = this.props;
		return (
			<div style={{margin:m_tb+" 0"}} 
				 onClick = {this.handleVoice}
				 className={
				 	classnames(
				 		"diy-conitem",
				 		{"w-disabled":this.state.status}
				 	)
				 }
			>
			    <div className={
					 	classnames(
					 		"diy-voice clearfix",
					 		{"voice-play":this.state.player}
					 	)
					 }
				 >
		            <img src={img} className="voice-logo" />
		            <span className="voice-bar">
		                <span className="w-pd-l w-black-2 voice-load">
		                	{this.state.status&&'加载中'}
		                </span>
		                <i className="voice-animation-static" />
		                <i className="voice-animation-play" />
		            </span> 
	        	</div>
			</div>
		);
	}
}
Tpl.propTypes = {

};
export default Tpl;