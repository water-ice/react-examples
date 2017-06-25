import React, { Component } from 'react';
import Child from './Child';
class Tools extends Component {
	render() {
		const { onAdd } = this.props;
		return (
			<div>
				<div style={{ overflow: 'hidden', clear: 'both' }}>
					<Child name="+部门" type="radio" onAdd={onAdd} />
					<Child name="+表单" type="input" onAdd={onAdd} />
				</div>
			</div>
		);
	}
}
export default Tools;
