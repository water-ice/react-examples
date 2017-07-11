import React, { Component, PropTypes } from 'react';
import { Toast , Tabs } from 'antd-mobile';
import ScrollList from './ScrollList';
const TabPane = Tabs.TabPane;
const tabs = [
	{
		name: "申请中",
		type: "1"
	},
	{
		name: "收款确认",
		type: "2"
	},
	{
		name: "已提取",
		type: "3"
	},
	{
		name: "已失效",
		type: "4"
	},
	{
		name: "全部",
		type: "0"
	}
];
class ListTabs extends Component {
	constructor(props, context) {
		super(props, context);
		this.handleChange = this.handleChange.bind(this);
	}
	componentWillMount() {
		const { type } = this.props;
		this.state = {
			type: type
		};
	}
	handleChange(key){
		_global.history.replace(`/test/tabs?type=${key}`);
		this.setState({
			type: key
		});
	}
	render() {
		const { listInfo, actions, type }=this.props;
		return (
			<div className="g-am-init g-reset">
				<Tabs defaultActiveKey={type} onChange={this.handleChange} swipeable={!1} animated={!0}>
					{
						tabs.map((item, index) => {
							return (
								<TabPane tab={`${item.name}`} key={item.type}>
									<ScrollList 
										show={this.state.type === type}
										type={item.type}
										listInfo={listInfo[item.type]}
										actions={actions}
									/>
								</TabPane>
							);
						})
					}
				</Tabs>
		  </div>
		);
	}
}
ListTabs.propTypes = {
};
export default ListTabs;