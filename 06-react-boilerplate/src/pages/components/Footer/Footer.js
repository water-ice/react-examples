import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';
import {Link} from 'react-router';
import './Footer.scss';
@pureRender
class Footer extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		return (
			<div>
				<div style={{height:95}}></div>
				<footer className="footer-nav w-media-fixed w-row w-reset">
				    <Link to="/">
				        <p><i className="iconfont icon-dianjia"/></p>
				        <span>
				            店铺
				        </span>
				    </Link>
				    <Link to="/category">
				        <p><i className="iconfont icon-chanpin"/></p>
				        <span>
				        	分类选购
				        </span>
				    </Link>
				    <Link to="/cart">
				        <p><i className="iconfont icon-jinhuoche"/></p>
				        <span>
				        	购物车
				        </span>
				    </Link>
				    <Link to="/user">
				        <p><i className="iconfont icon-foot04"/></p>
				        <span>
				        	我
				        </span>
				    </Link>
				</footer>
			</div>
		);
	}
}
Footer.propTypes = {

};
export default Footer;

