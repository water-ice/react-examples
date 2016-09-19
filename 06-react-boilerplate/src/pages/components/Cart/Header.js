import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';
/*ant*/
import { Flex } from 'antd-mobile';
@pureRender
class Header extends Component {
	constructor(props, context) {
		super(props, context);
		this.handleEdit = this.handleEdit.bind(this);// 编辑事件
	}
	handleEdit(){
		this.props.actions.cartEdit();
	}
	render() {
		const { edit , count } = this.props;
		return (
			<div className="w-pd w-bg-white">
				<Flex>
		            <Flex.Item>
		            	购物车（{count}）
		            </Flex.Item>
		            <Flex.Item className="w-tr w-pd-l" onClick = {this.handleEdit}>
		            	{edit?'编辑':'完成'}
		            </Flex.Item>
	          	</Flex>
          	</div>
		);
	}
}
Header.propTypes = {
	count: React.PropTypes.number,
	edit: React.PropTypes.bool
};
export default Header;