import React, { Component, PropTypes } from 'react';
const lStyle={
	position: 'fixed',
	width: '100%',
	left: 0,
	right: 0,
	margin: 'auto',
	bottom: 200,
	zIndex: 9,
	paddingLeft: 50,
};
const divStyle = {
	float:'left',
	width: 70
};
const iStyle = {
	float: 'right',
	borderRadius:'100%',
	textAlign: 'center',
	background:'rgba(0,0,0,.5)',
	lineHeight:'70px',
	height:70,
	width:70,
	marginTop:-70
};
function goback(event){
	event.preventDefault();
	_global.history.goBack();
}
const GoBack = (props) => {
	return (
		<div style={lStyle}>
			<div style={divStyle}>
				<i 
					className="iconfont icon-goback w-white w-lh-44 w-fs-50" 
					style={iStyle}  
					onClick={goback}
				 />
			</div>
		</div>
	);
};

export default GoBack;