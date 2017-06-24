import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Knight from './Knight';
import BoardSquare from './BoardSquare';
class Board extends Component {
	constructor(props, context) {
		super(props, context);
	}
	renderPiece(x, y) {
		const [knightX, knightY] = this.props.knightPosition;
		if (x === knightX && y === knightY) {
			return <Knight />;
		}
	}
	renderSquare(i) {
		const x = i % 8;
		const y = Math.floor(i / 8);
		return (
			<div 
				key={i}
				style={{ width: '12.5%', height: '12.5%' }}>
				<BoardSquare 
					x={x}
					y={y}
					onMove={this.props.onMove}
					knightPosition={this.props.knightPosition}
				>
					{this.renderPiece(x, y)}
				</BoardSquare>
			</div>
		);
	}
	render() {
		let squares = [];
		for (let i = 0; i < 64; i++) {
			squares = [...squares, this.renderSquare(i)];
		}
		return (
			<div style={{
				width: '100%',
				height: '100%',
				display: 'flex',
				flexWrap: 'wrap'
			}}>
				{squares}
			</div>
		);
	}
}
Board.propTypes = {
	knightPosition: PropTypes.arrayOf(
		PropTypes.number.isRequired
	).isRequired
};
export default Board;