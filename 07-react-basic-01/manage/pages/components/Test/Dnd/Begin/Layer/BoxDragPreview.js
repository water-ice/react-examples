import React, { Component } from 'react';
import PropTypes from 'prop-types';
import pureRender from 'pure-render-decorator';
import Box from './Box';

const styles = {
	display: 'inline-block',
	transform: 'rotate(-7deg)',
	WebkitTransform: 'rotate(-7deg)',
};
@pureRender
class BoxDragPreview extends Component {
	constructor(props) {
		super(props);
		this.tick = this.tick.bind(this);
		this.state = {
			tickTock: false,
		};
	}

	componentDidMount() {
		this.interval = setInterval(this.tick, 500);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	tick() {
		this.setState({
			tickTock: !this.state.tickTock,
		});
	}

	render() {
		const { title } = this.props;
		const { tickTock } = this.state;

		return (
			<div style={styles}>
				<Box title={title} yellow={tickTock} />
			</div>
		);
	}
}
BoxDragPreview.propTypes = {
	title: PropTypes.string.isRequired,
};
export default BoxDragPreview;
