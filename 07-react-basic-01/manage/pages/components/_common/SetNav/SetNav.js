import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router';
class SetNav extends Component {
	render() {
		const { nav=[] } = this.props;
		return (
			<div className="g-none-select">
				<Breadcrumb style={{ margin: '12px 0' }}>
					{
						nav.map((item = {}, index) => {
							const { to, name } = item;
							return (
								<Breadcrumb.Item key={item}>
									{to? <Link to={to}>首页</Link> : name }
								</Breadcrumb.Item>
							);
						})
					}
				</Breadcrumb>
			</div>
		);
	}
}
SetNav.propTypes = {
	nav: PropTypes.array
};
export default SetNav;