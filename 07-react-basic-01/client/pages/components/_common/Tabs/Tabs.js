import React, { Component, PropTypes, Children } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import TabPane from './TabPane';
import "./Tabs.scss";
class Tabs extends Component {
	static TabPane = TabPane;
	constructor(props,context) {
		super(props);
		this.handleClick = this.handleClick.bind(this);
		this.getIndex = this.getIndex.bind(this);
		this.state = { 
			currentIndex:'',
		 	currentkey:this.props.defaultActiveKey||this.props.activeKey
		};
	}
	componentWillMount(){
		const {
			currentkey
		} = this.state;
		let arrKeys = Children.map(this.props.children,(item,index)=>{
			return [...[],item.key];
		});
		let index = this.getIndex(arrKeys,currentkey);
		this.setState({
			currentIndex:index,//通过keys判断现在默认tab的索引
		 });
	};
	//函数判断默认tab的索引
	getIndex(arr,defaultActiveKey){
		for (let i = 0; i < arr.length; i++) {
			if(arr[i] == defaultActiveKey) {
				return i;
			}
		}
		return -1;
	}
	handleClick(event){
		const { onChange } = this.props;
		let $this = event.currentTarget;
		let index = $this.getAttribute("data-index");
		let key = $this.getAttribute("data-key");
		onChange&&onChange(key);
		this.setState({
		 	currentIndex:index,
		 	currentkey:key
		});
	}
	render() {
		const divStyle1 = {
			width:_global.innerWidth*1/this.props.children.length,
			transform: `translate3d(${(_global.innerWidth/this.props.children.length)*this.state.currentIndex}px, 0px, 0px)`,
		};
		const divStyle2 = {
			transform: `translate3d(-${(_global.innerWidth)*this.state.currentIndex}px, 0px, 0px)`
		};
		return (
			<div className="rc-tabs">
				<div className="_bar">
					{ 
						Children.map(this.props.children,(item,index)=>{
							return(
								<div  
								className={
									classNames(
										"_tab",
										{"_active":(item.key==this.state.currentkey)}
									)
								}
								key={`${index}_item`}
								data-index={index}
								data-key={item.key}
								onClick={this.handleClick}
								>
									{item.props.tab}
								</div>
							);
						}) 
					}
					<div className="_line-animated" style={divStyle1} />
				</div>
				<div className="_content">
					{ 
						Children.map(this.props.children,(item,index)=>{
							return(
								<div 
									data-id={index}
									className="_animated"
									style={divStyle2}
								>
									{item}
								</div>
							);
						}) 
					}
				</div>
			</div>
			
		);
	}
}

export default Tabs;