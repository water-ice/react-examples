import React, { Component } from 'react';
import './Tools.scss';
import Child from './Child';
import {Button} from 'antd';
class Tools extends Component {
	render() {
		return (
			<div className="v-dnd-tools">
				<Button type="primary">自由控件</Button>
				<div style={{ overflow: 'hidden', clear: 'both' }}>
					<Child name="+部门" type="radio" {...this.props}/>
					<Child name="+表单" type="input" {...this.props} />
				</div>
			</div>
		);
	}
}
export default Tools;
