import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import Aside from './Aside';
// redux 
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as LayoutActions from '@actions/layout';
function mapStateToProps(state) {
	return {
		layoutMain: state.layoutMain
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(LayoutActions, dispatch)
	};
}

// decorator
export default (options = {}) => function createDecorator(WrappedComponent) {
	class LayoutDecorator extends Component {
		constructor() {
			super();
			this.state = {
				// 是否折叠
				collapsed: false
			};
			this.handleToggle = ::this.handleToggle;
		}
		handleToggle(){
			this.setState({
				collapsed: !this.state.collapsed,
			});
		};
		render() {
			const { location:{ pathname } } = this.props;
			const { collapsed } = this.state;
			return (
				<div style={{height: _global.innerHeight}}>
					<Layout className="ant-layout-has-sider g-ant-layout">
						<Aside path={pathname} collapsed={collapsed} component={WrappedComponent}/>
						<Layout className="g-ant-layout">
							<Layout.Header style={{ background: '#fff', paddingLeft: 24 }}>
								<Icon
									className="trigger"
									type={collapsed ? 'menu-unfold' : 'menu-fold'}
									onClick={this.handleToggle}
								/>
							</Layout.Header>
							<Layout.Content style={{ margin: '10px 10px 0 10px', overflow: 'initial' }}>
								{this.props.children}
							</Layout.Content>
							<Layout.Footer style={{ textAlign: 'center' }}>
								Admin ©2017 Created by zrd
							</Layout.Footer>
						</Layout>
					</Layout>
				</div>
			);
		}
	};
	return connect(mapStateToProps, mapDispatchToProps)(LayoutDecorator);
};

