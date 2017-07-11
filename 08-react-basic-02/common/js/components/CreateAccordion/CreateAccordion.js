import React, { Component, cloneElement, Children } from 'react';
import PropTypes from 'prop-types';
import './CreateAccordion.scss';
class CreateAccordion extends Component {
	constructor(props, context) {
		super(props, context);
		this.state ={
			show: !1
		};
		this.handleSlide = ::this.handleSlide;
	}
	handleSlide(){
		const { refName } = this.props;
		this.setState({
			show: !this.state.show
		}, () => {
			try{
				const $this = this.refs.slide.refs[refName];
				let height = 0;
				for (let i = 0; i < $this.childNodes.length; i++){
					height += $this.childNodes[i].offsetHeight;
				}
				$this.style.height = this.state.show ? `${height}px` : `0px`;
			}catch(e){
				console.log(e);
			}
			
		});
	}
	render() {
		const { show } = this.state;
		return (
			cloneElement(
				Children.only(this.props.children), {
					__decorator: 'success',
					accordion: {
						show,
						eventHandler: this.handleSlide,
						icon: `iconfont g-fs-20 ${show ? "icon-down" : "icon-up"}`,
						content: `c-accordion ${show ? "__active" : ""}`,
					},
					ref: "slide"
				}
			)
		);

		 
	}
}
CreateAccordion.propTypes = {
	refName: PropTypes.string.isRequired
};
export default CreateAccordion;