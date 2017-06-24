import React, { Component } from 'react';
import PropTypes from 'prop-types';
import pureRender from 'pure-render-decorator';
import Container from './Container';
import CustomDragLayer from './CustomDragLayer';
@pureRender
class Layer extends Component {
	constructor(props, context) {
		super(props, context);
		this.handleSnapToGridAfterDropChange = ::this.handleSnapToGridAfterDropChange;
		this.handleSnapToGridWhileDraggingChange = ::this.handleSnapToGridWhileDraggingChange;

		this.state = {
			snapToGridAfterDrop: false,
			snapToGridWhileDragging: false,
		};
	}
	handleSnapToGridAfterDropChange() {
		this.setState({
			snapToGridAfterDrop: !this.state.snapToGridAfterDrop,
		});
	}

	handleSnapToGridWhileDraggingChange() {
		this.setState({
			snapToGridWhileDragging: !this.state.snapToGridWhileDragging,
		});
	}
	render() {
		const { snapToGridAfterDrop, snapToGridWhileDragging } = this.state;

		return (
			<div>
				<h3>4.容器内拖拽</h3>
				<Container snapToGrid={snapToGridAfterDrop} />
				<CustomDragLayer snapToGrid={snapToGridWhileDragging} />
				<p>
					<label htmlFor="snapToGridWhileDragging">
						<input
							id="snapToGridWhileDragging"
							type="checkbox"
							checked={snapToGridWhileDragging}
							onChange={this.handleSnapToGridWhileDraggingChange}
						/>
						<small>Snap to grid while dragging</small>
					</label>
					<br />
					<label htmlFor="snapToGridAfterDrop">
						<input
							id="snapToGridAfterDrop"
							type="checkbox"
							checked={snapToGridAfterDrop}
							onChange={this.handleSnapToGridAfterDropChange}
						/>
						<small>Snap to grid after drop</small>
					</label>
				</p>
			</div>
		);
	}
}
Layer.propTypes = {
};
export default Layer;