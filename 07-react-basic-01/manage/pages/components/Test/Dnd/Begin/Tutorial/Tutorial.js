import React, { Component } from 'react';
import PropTypes from 'prop-types';
import pureRender from 'pure-render-decorator';
import Board from './Board';
@pureRender
class Tutorial extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			x: 1,
			y: 7
		};
		this.handleMove = ::this.handleMove;
	}
	handleMove(x, y){
		this.setState({
			x: x,
			y: y
		});
	}
	render() {
		const { x, y } = this.state;
		return (
			<div>
				<h3>1.教程案例</h3>
				<div
					style={{
						width: 500,
						height: 500,
						border: '1px solid gray',
				  }}
				>
					<Board 
						knightPosition={[x, y]}
						onMove={this.handleMove}
					/>
				</div>
			</div>
		);
	}
}
Tutorial.propTypes = {
};
export default Tutorial;