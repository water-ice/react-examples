import React, { Component } from 'react';
import Radio from './Modules/Radio/Radio';
import Input from './Modules/Input/Input';

class Modules extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		const { item, itemData, onFind , actions } = this.props;
		const type = item.split('#')[0];
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
