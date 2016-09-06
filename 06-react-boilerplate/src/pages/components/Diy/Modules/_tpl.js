import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';
@pureRender
class Tpl extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		return (
			<div>
				test
          	</div>
		);
	}
}
Tpl.propTypes = {

};
export default Tpl;