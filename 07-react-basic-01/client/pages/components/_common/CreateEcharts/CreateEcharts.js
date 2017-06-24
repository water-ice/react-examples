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
		}
	}
	render() {
		// this.props
		return React.cloneElement(React.Children.only(this.props.children),{__decorator:'success'});
	}
}
export default CreateEcharts;