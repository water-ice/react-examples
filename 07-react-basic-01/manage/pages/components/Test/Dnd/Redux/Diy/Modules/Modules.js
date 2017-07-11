import React, { Component } from 'react';
import Radio from './Radio/Radio';
import Input from './Input/Input';
const Modules = (props) => {
	const { item, itemData } = props;
	const type = item.split('#')[0];
	switch(type){
		case "radio":
			return (<Radio itemData={itemData} />);
		case "input":
			return (<Input itemData={itemData} />);
		default:
			return null;
	}
};

export default Modules;
