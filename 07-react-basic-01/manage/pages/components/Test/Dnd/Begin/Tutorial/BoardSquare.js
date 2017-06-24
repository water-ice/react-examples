import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Square from './Square';
import { DropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';

const squareTarget = {
	canDrop(props){
		const [_x, _y] = props.knightPosition;
		const dx = props.x - _x;
		const dy = props.y - _y;

		return (Math.abs(dx) === 2 && Math.abs(dy) === 1) || (Math.abs(dx) === 1 && Math.abs(dy) === 2);
	},
	drop(props) {
		props.onMove(props.x, props.y);
	}
};

function collect(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver(),
		canDrop: monitor.canDrop()
	};
}
@DropTarget(ItemTypes.KNIGHT, squareTarget, collect)
class BoardSquare extends Component {
	renderOverlay(color) {
	   return (
			<div style={{
				position: 'absolute',
				top: 0,
				left: 0,
				height: '100%',
				width: '100%',
				zIndex: 1,
				opacity: 0.5,
				backgroundColor: color,
			}}/>
	   );
	 }
	render() {
		const {
			x,
			y,
			connectDropTarget,
			isOver,
			canDrop
		} = this.props;
		const black = (x + y) % 2 === 1;

		return connectDropTarget( 
			<div style={{
				position: 'relative',
				width: '100%',
				height: '100%'
			}}>
			<Square black={black}>
				{this.props.children}
			</Square> 
				{isOver && !canDrop && this.renderOverlay('red')}
        		{!isOver && canDrop && this.renderOverlay('yellow')}
        		{isOver && canDrop && this.renderOverlay('green')}
			</div>
		);
	}
}

BoardSquare.propTypes = {
	x: PropTypes.number.isRequired,
	y: PropTypes.number.isRequired,
	isOver: PropTypes.bool
};
export default BoardSquare;