import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';
@pureRender
class Memo extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		return (
			<div className="order-memo">
				<div className="w-row w-pd">
					<label htmlFor="memo" className="w-col-3">买家留言：</label>
					<input id="memo"  className="w-col-9" type="text" placeholder="选填，请在这里留下您的要求" />
				</div>
			</div>
		);
	}
}
Memo.propTypes = {
};
export default Memo;