import React, { Component, PropTypes } from 'react';
import pureRender from 'pure-render-decorator';
@pureRender
class Memo extends Component {
	constructor(props, context) {
		super(props, context);
		this.state={
			v:''
		};
		this.handleChange = this.handleChange.bind(this);
	}
	handleChange(event){
		this.setState({
			v:event.target.value
		});
	}
	render() {
		return (
			<div className="order-memo w-bg-white w-m-b w-bb">
				<div className="w-row w-pd">
					<label htmlFor="memo" className="w-col-3">买家留言：</label>
					<input  
						id="memo"  
					    className="w-col-9" 
					    type="text" 
					    placeholder="选填，请在这里留下您的要求"
					    value={this.state.v}
					    onChange={this.handleChange}
					/>
				</div>
			</div>
		);
	}
}
Memo.propTypes = {
};
export default Memo;