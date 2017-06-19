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
				<Menu.SubMenu
					key="/test/ui"
					title={<span><Icon type="scan" /><span className="_nav-text">UI</span></span>}
				>
					<Menu.Item key="/test/ui/buttons"><Link to={'/test/ui/buttons'}>按钮</Link></Menu.Item>
					<Menu.Item key="/test/ui/icons"><Link to={'/test/ui/icons'}>图标</Link></Menu.Item>
					<Menu.Item key="/test/ui/spins"><Link to={'/test/ui/spins'}>加载中</Link></Menu.Item>
					<Menu.Item key="/test/ui/modals"><Link to={'/test/ui/modals'}>对话框</Link></Menu.Item>
					<Menu.Item key="/test/ui/notifications"><Link to={'/test/ui/notifications'}>通知提醒框</Link></Menu.Item>
					<Menu.Item key="/test/ui/tabs"><Link to={'/test/ui/tabs'}>标签页</Link></Menu.Item>
					<Menu.Item key="/test/ui/banners"><Link to={'/test/ui/banners'}>轮播图</Link></Menu.Item>
					<Menu.Item key="/test/ui/wysiwyg"><Link to={'/test/ui/wysiwyg'}>富文本</Link></Menu.Item>
					<Menu.Item key="/test/ui/drags"><Link to={'/test/ui/drags'}>拖拽</Link></Menu.Item>
					<Menu.Item key="/test/ui/gallery"><Link to={'/test/ui/gallery'}>画廊</Link></Menu.Item>
				</Menu.SubMenu>
				<Menu.SubMenu
					key="/test/animation"
					title={<span><Icon type="rocket" /><span className="_nav-text">动画</span></span>}
				>

					<Menu.Item key="/test/animation/basicAnimations"><Link to={'/test/animation/basicAnimations'}>基础动画</Link></Menu.Item>
					<Menu.Item key="/test/animation/exampleAnimations"><Link to={'/test/animation/exampleAnimations'}>动画案例</Link></Menu.Item>
				</Menu.SubMenu>
				<Menu.SubMenu
					key="/test/table"
					title={<span><Icon type="copy" /><span className="_nav-text">表格</span></span>}
				>

					<Menu.Item key="/test/table/basicTable"><Link to={'/test/table/basicTable'}>基础表格</Link></Menu.Item>
					<Menu.Item key="/test/table/advancedTable"><Link to={'/test/table/advancedTable'}>高级表格</Link></Menu.Item>
					<Menu.Item key="/test/table/asynchronousTable"><Link to={'/test/table/asynchronousTable'}>异步表格</Link></Menu.Item>
				</Menu.SubMenu>
				<Menu.SubMenu
					key="/test/form"
					title={<span><Icon type="edit" /><span className="_nav-text">表单</span></span>}
				>

					<Menu.Item key="/test/basicForm"><Link to={'/test/form/basicForm'}>基础表单</Link></Menu.Item>
				</Menu.SubMenu>
				<Menu.SubMenu
					key="/test/chart"
					title={<span><Icon type="area-chart" /><span className="_nav-text">图表</span></span>}
				>
					<Menu.Item key="/test/chart/echarts"><Link to={'/test/chart/echarts'}>echarts</Link></Menu.Item>
					<Menu.Item key="/test/chart/recharts"><Link to={'/test/chart/recharts'}>recharts</Link></Menu.Item>
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
// import React, { Component, PropTypes } from 'react';
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
