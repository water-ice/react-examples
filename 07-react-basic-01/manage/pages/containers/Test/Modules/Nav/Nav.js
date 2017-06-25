import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router';
import createLayout from '@components/Layout/Layout';
@createLayout({path: "test"})
class Nav extends Component {
	constructor(props){
		super(props);
	}
	render() {
		// 注意，这里的props是createNav中管理的
		const { menuProps } = this.props;
		return (
			<Menu {...menuProps}>
				<Menu.Item key="/test/main">
					<Link to={'/test/main'}><Icon type="mobile" /><span className="_nav-text">首页</span></Link>
				</Menu.Item>
				<Menu.Item key="/test/second">
					<Link to={'/test/second'}><Icon type="mobile" /><span className="_nav-text">Second</span></Link>
				</Menu.Item>
				<Menu.Item key="/test/echart">
					<Link to={'/test/echart'}><Icon type="mobile" /><span className="_nav-text">图表</span></Link>
				</Menu.Item>
				<Menu.SubMenu
					key="/test/dnd"
					title={<span><Icon type="scan" /><span className="_nav-text">DND</span></span>}
				>
					<Menu.Item key="/test/dnd/begin"><Link to={'/test/dnd/begin'}>入门</Link></Menu.Item>
					<Menu.Item key="/test/dnd/combo"><Link to={'/test/dnd/combo'}>组合</Link></Menu.Item>
				</Menu.SubMenu>
			
				<Menu.SubMenu
					key="sub4"
					title={<span><Icon type="switcher" /><span className="_nav-text">页面</span></span>}
				>
					<Menu.Item key="/login"><Link to={'/login'}>登录</Link></Menu.Item>
					<Menu.Item key="/404"><Link to={'/404'}>404</Link></Menu.Item>
				</Menu.SubMenu>
			</Menu>
		);
	}
}

export default Nav;

// 原方式，上面场景可能不适合全部人，可以用下面这种
// import React, { Component } from 'react';
import PropTypes from 'prop-types';
// class Nav extends Component {
// 	componentWillMount() {
// 	}
// 	render() {
// 		return (
// 			<div>
// 				<div>我的导航</div>
// 				<div>{this.props.children}</div>
// 			</div>
// 		);
// 	}
// }

// Nav.propTypes = {};

// export default Nav;
