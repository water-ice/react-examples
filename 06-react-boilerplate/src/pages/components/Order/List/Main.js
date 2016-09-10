import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';
import { Toast , Tabs } from 'antd-mobile';
import ScrollList from './ScrollList';
const TabPane = Tabs.TabPane;
@pureRender
class Main extends Component {
	constructor(props, context) {
		super(props, context);
		this.handleChange = this.handleChange.bind(this);
	}
	componentWillMount() {
		this.state ={
			type:this.props.type
		};
	}
	handleChange(key){
		_global.history.replace('/order?pages=list&type='+key);
		this.setState({
			type:key
		});
	}
	render() {
		const {
			type,
			actions,
			order
		} = this.props;
		const {list} = order;
		return (
			<div className="w-am-init">
				<Tabs defaultActiveKey={type} onChange={this.handleChange} swipeable={false}>
		          	<TabPane tab="全部" key="all">
		            	<ScrollList show={this.state.type==='all'}
		            				type={'all'}
		            				listInfo={list.all}
		            				actions={actions}
		            	/>
		          	</TabPane>
		          	<TabPane tab="待付款" key="topay">
		           		topay
		          	</TabPane>
		          	<TabPane tab="待发货" key="tosend">
		           		tosend
		          	</TabPane>
		        	<TabPane tab="待收货" key="torec">
		           		torec
		          	</TabPane>
		        	<TabPane tab="已完成" key="complete">
		           		complete
		          	</TabPane>
		        </Tabs>
	      </div>
		);
	}
}
Main.propTypes = {
};
export default Main;