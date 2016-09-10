import React, { Component, PropTypes } from 'react';
import {lazyload} from 'react-lazyload';
//import Dropload from '../_common/Dropload/Dropload';
import Title from './Modules/Title';
import TextNav from './Modules/TextNav.js';
import ImgNav from './Modules/ImgNav.js';
import TopNav from './Modules/TopNav.js';
import Showcase from './Modules/Showcase.js';
import Slide from './Modules/Slide.js';
import Notice from './Modules/Notice.js';
import Search from './Modules/Search.js';
import Space from './Modules/Space.js';
import CutOff from './Modules/CutOff.js';
import Tel from './Modules/Tel.js';
import Video from './Modules/Video.js';
import Voice from './Modules/Voice.js';
import Goods from './Modules/Goods.js';
import './Diy.scss';
@lazyload({
  	height: 200,
  	once: true,
  	offset: 0,
  	//overflow:true
  	//placeholder:(<Dropload />)
})
class Diy extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		const {item,itemData} = this.props;
		switch(item){
			case "search":
				return (<Search />);
			case "cut_off":
				return (<CutOff />);
			case "title" :
				return (<Title {...itemData} />);
			case "text_nav" :
				return (<TextNav {...itemData} />);
			case "img_nav" :
				return (<ImgNav {...itemData} />);
			case "top_nav" :
				return (<TopNav {...itemData} />);
			case "showcase" :
				return (<Showcase {...itemData} />);
			case "slide":
				return (<Slide {...itemData}/>);
			case "notice":
				return (<Notice {...itemData}/>);
			case "space":
				return (<Space {...itemData}/>);
			case "tel":
				return (<Tel {...itemData}/>);
			case "video":
				return (<Video {...itemData}/>);
			case "voice":
				return (<Voice {...itemData}/>);
			case "goods":
				return (<Goods {...itemData}/>);
			default:
				return null;
		}
	}
}
Diy.propTypes = {

};
export default Diy;
