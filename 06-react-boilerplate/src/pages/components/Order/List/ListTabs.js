import React, { Component, PropTypes } from 'react';
import { Toast , Tabs } from 'antd-mobile';
import ScrollList from './ScrollList';
const TabPane = Tabs.TabPane;
class ListTabs extends Component {
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
			<div className="w-am-init w-reset">
				<Tabs defaultActiveKey={type} onChange={this.handleChange} swipeable={!0} animated={!0}>
		          	<TabPane tab="全部" key="all">
		            	<ScrollList show={this.state.type==='all'}
		            				type={'all'}
		            				listInfo={list.all}
		            				actions={actions}
		            	/>
		          	</TabPane>
		          	<TabPane tab="待付款" key="topay">
		           		<ScrollList show={this.state.type==='topay'}
		           					type={'topay'}
		           					listInfo={list.topay}
		           					actions={actions}
		           		/>
		          	</TabPane>
		          	<TabPane tab="待发货" key="tosend">
		           		<ScrollList show={this.state.type==='tosend'}
		           					type={'tosend'}
		           					listInfo={list.tosend}
		           					actions={actions}
		           		/>
		          	</TabPane>
		        	<TabPane tab="待收货" key="torec">
		           		<ScrollList show={this.state.type==='torec'}
		           					type={'torec'}
		           					listInfo={list.torec}
		           					actions={actions}
		           		/>
		          	</TabPane>
		        	<TabPane tab="已完成" key="complete">
		           		<ScrollList show={this.state.type==='complete'}
		           					type={'complete'}
		           					listInfo={list.complete}
		           					actions={actions}
		           		/>
		          	</TabPane>
		        </Tabs>
	      </div>
		);
	}
}
ListTabs.propTypes = {
	order: React.PropTypes.shape({
		main :React.PropTypes.object
	}),
	actions: React.PropTypes.object
};

export default ListTabs;