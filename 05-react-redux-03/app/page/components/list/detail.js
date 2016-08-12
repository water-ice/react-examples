import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import { formatDate } from 'utils';
import { LATEST_NEWS, LIKE_NEWS , GET_COMMENT_LIS } from '../../constants/constants';
import Dropload from './dropload';
import Touch from './touch';
class Detail extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			
		};
		this.newsId = this.props.params.id;
		this.commentId = this.props.params.commentid;

	}
	componentWillMount() {
		
	}
	componentDidMount() {
		
	}
	render() {
		let details = this.props.details || {},
			detailStr = details.hasOwnProperty(this.newsId) ? details[this.newsId] : ''; 

		console.log(detailStr);
		let detailContent = detailStr.split('\n\n').map((item, index) => {
			// console.log(item);
			switch (index) {
				case 0:
					return (
						<p key={index} className="title">{item}</p>
					);
				case 1:
					return (
						<p key={index} className="src">{item}</p>
					);
				default:

					let regex = new RegExp('(\[http:\/\/(\w.+)\])', 'i');
					let matches = item.match(regex);
					// console.log(matches);
					if (matches !== null && !!~matches.input.indexOf("\[http://")) {
						// console.log(item);
						return (
							<p key={index} className="imgNode">
								<img src={item.replace("\[", "").replace("\]", "")} />
							</p>
						);
					}
					else {
						return (
							<p key={index} className="text">{item}</p>
						);
					}
			}
		});

		return (
	        <div className="detail-wrapper">
	        	{detailContent}
	        	<div className="btns">
	        		<Touch onTap={() => {
        				this.context.router.goBack();
        				// this.context.router
        			}}>首页</Touch>
        			<Touch onTap={() => {
        				this.context.router.push('comment/' + this.commentId);
        			}}>精彩评论</Touch>
	        	</div>
	        	<Dropload isState={this.props.spinLoading}/>
	        </div>
		);
	}
}

Detail.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default Detail;