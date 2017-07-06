import React, { Component } from 'react';
const getViewport = scale => `width=device-width, initial-scale=${scale}, minimum-scale=${scale}, maximum-scale=${scale}, user-scalable=no`;
const viewport = getViewport(0.5);
const _viewport = getViewport(1.0);
const meta = document.querySelector("meta[name=viewport]");
class CreateEcharts extends Component {
	constructor(props) {
		super(props);
	}
	componentWillMount() {
		if (meta.getAttribute('content') != _viewport) {
			document.body.classList.add("g-init-echart");
			document.documentElement.style.fontSize = "312.5%"; // antd-mobile rem
			meta.setAttribute('content', _viewport);
			_global.scale = 1;
		}
	}
	componentDidMount() {
	}

	shouldComponentUpdate() {
	}
	componentWillUnmount() {
		if (meta.getAttribute('content') != viewport) {
			document.body.classList.remove("g-init-echart");
			document.documentElement.style.fontSize = "625%"; // antd-mobile rem
			meta.setAttribute('content', viewport);
			_global.scale = 0.5;
		}
	}
	render() {
		// this.props
		return React.cloneElement(React.Children.only(this.props.children),{__decorator:'success'});
	}
}
export default CreateEcharts;