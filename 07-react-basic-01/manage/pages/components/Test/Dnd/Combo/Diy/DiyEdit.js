import React, { Component } from 'react';
import Radio from './Modules/Radio/Edit';
import Input from './Modules/Input/Edit';

class Modules extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		const { item } = this.props;
		const type = item ? item.split('#')[0] : null;
		switch(type){
			case "radio":
				return (<Radio {...this.props} />);
			case "input":
				return (<Input {...this.props} />);
			default:
				return null;
		}
	}
}
Modules.propTypes = {

};
export default Modules;
