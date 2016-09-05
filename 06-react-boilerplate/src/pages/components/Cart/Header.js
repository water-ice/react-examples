import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';
/*ant*/
import {
	Flex
} from 'antd-mobile';
/*
	建议后期转化为无状态组件
	如果没有加状态
	const Header = (props) => {
		....
	};
*/
@pureRender
class Header extends Component {

	constructor(props, context) {
		super(props, context);
	}
	render() {
		const { edit , count, onEdit} = this.props;
		return (
			<div className="w-pd w-bg-white">
				<Flex>
		            <Flex.Item>
		            	购物车（{count}）
		            </Flex.Item>
		            <Flex.Item className="w-tr w-pd-l" onClick = {onEdit}>
		            	{edit?'编辑':'完成'}
		            </Flex.Item>
	          	</Flex>
          	</div>
		);
	}
}
Header.propTypes = {
	onClick: React.PropTypes.func,
	count: React.PropTypes.number,
	edit: React.PropTypes.bool
};
export default Header;