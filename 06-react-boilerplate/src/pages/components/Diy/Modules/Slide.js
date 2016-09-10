import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import pureRender from 'pure-render-decorator';
import {Carousel} from 'antd-mobile';
import {Link} from 'react-router';
@pureRender
class Title extends Component {
	constructor(props, context) {
		super(props, context);
		this.state ={
	      current: 0
		};
		this.slideTo = this.slideTo.bind(this);
	}
	slideTo(index) {
    	/*this.setState({
    	    current:index
    	});*/
  	}
	render() {
		const {
			style,
			pd_tb,
			m_tb,
			item_list
		} = this.props;
		const settings = {
	      	dots: true,
	      	autoplay: true,
	      	infinite: true,
	      	mode: 'banner',
	      	initialSlide: this.state.current,
	      	//afterChange: this.slideTo
	    };
		return (
			<div>
				<div className="diy-conitem diy-slide" style={{margin:m_tb+" 0"}}>
				    {style==1?
				    	<Carousel {...settings}>
	                	{item_list.map((item,index)=>{
	                	    const {url,img} = item ;
	                	    return (
	                	       <Link to={url} key = {index}>
	                	           <img src={`${img}!1-0`} />
	                	       </Link> 
	                	    );
	                	})}
	                	</Carousel>
	            	:
	                	item_list.map((item,index)=>{
	                	    const {url,img} = item ;
	                	    return (
	                	       <Link to={url} key = {index}>
	                	           <img src={`${img}!1-0`} />
	                	       </Link> 
	                	    );
	                	})
	            	}
				</div>
          	</div>
		);
	}
}
Title.propTypes = {

};
export default Title;