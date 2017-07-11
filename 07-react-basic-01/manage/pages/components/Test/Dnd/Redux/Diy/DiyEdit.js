import React, { Component } from 'react';
import ModulesEdit from './Modules/ModulesEdit';
import {Button} from 'antd';

class Modules extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		return (
			<div>
				<Button type="primary">控件设置</Button>
				<ModulesEdit {...this.props} />
			</div>
			
		);
		
	}
}
Modules.propTypes = {

};
export default Modules;
