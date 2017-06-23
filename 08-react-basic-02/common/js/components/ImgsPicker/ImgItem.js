import React, { Component } from 'react';
import PropTypes from 'prop-types';
const divStyle = {
	position:'relative',
	width:150,
	height:150,
	display: 'inline-block'
};
const deleteStyle = {
	width:30,
	height:30,
	color:'#fff',
	lineHeight: '22px',
	position:'absolute',
	top:0,
	right:0,
	textAlign: 'center',
	borderRadius: '100%',
	background: 'rgb(208,208,208)'
};
const imgStyle = {
	width:150,
	height:150,
	borderRadius:4,
	padding:10
};
class ImgItem extends Component {
	constructor(props, context) {
		super(props, context);
		this.handleDelete = this.handleDelete.bind(this);
		this.handlePreview = this.handlePreview.bind(this);
	}
	handlePreview(event){
		event.preventDefault();
		event.stopPropagation();
		const {
			img
		} = this.props;
		this.props.onPreview&&this.props.onPreview(event);
	}
	handleDelete(event){
		event.preventDefault();
		event.stopPropagation();
		const {
			img
		} = this.props;
		this.props.onDelete&&this.props.onDelete(img);
	}
	render() {
		const {
			img,
			index
		} = this.props;
		return(
			<div style={divStyle}>
				<img src={`${img}`} onClick={this.handlePreview} data-index={index} style={imgStyle}/>
				<div style={deleteStyle} onClick={this.handleDelete}>x</div>
			</div>
		);
	}
}
export default ImgItem;