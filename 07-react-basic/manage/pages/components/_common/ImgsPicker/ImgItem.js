import React, { Component, PropTypes } from 'react';
const divStyle = {
	position:'relative',
	width:120,
	height:90,
	display: 'inline-block'
};
const deleteStyle = {
	width:20,
	height:20,
	color:'#fff',
	lineHeight: '15px',
	position:'absolute',
	top:'-5px',
	right:'15px',
	textAlign: 'center',
	borderRadius: '100%',
	background: 'rgb(208,208,208)'
};
const imgStyle = {
	width:120,
	height:90,
	borderRadius:4,
	padding: '0 20px 10px 20px'
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
			<div className="_div" >
				<img src={`${img}!4-4`} onClick={this.handlePreview} data-index={index}  className="_img"/>
				<div  className="_del" onClick={this.handleDelete}>x</div>
			</div>
		);
	}
}
export default ImgItem;