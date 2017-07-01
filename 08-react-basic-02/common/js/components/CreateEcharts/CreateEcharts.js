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
			meta.setAttribute('content', _viewport);
		}
	}
	componentDidMount() {
	}

	shouldComponentUpdate() {
	}
	componentWillUnmount() {
		if (meta.getAttribute('content') != viewport) {
			meta.setAttribute('content', viewport);
			document.body.classList.remove("g-init-echart");
		}
	}
	render() {
		// this.props
		return React.cloneElement(React.Children.only(this.props.children),{__decorator:'success'});
	}
}
export default CreateEcharts;