import React, { Component } from 'react';
import Radio from './Radio/Edit';
import Input from './Input/Edit';
const ModulesEdit = (props) => {
	const { item } = props;
	const type = item ? item.split('#')[0] : null;
	switch(type){
		case "radio":
			return (<Radio {...props} />);
		case "input":
			return (<Input {...props} />);
		default:
			return null;
	}
};

export default ModulesEdit;
