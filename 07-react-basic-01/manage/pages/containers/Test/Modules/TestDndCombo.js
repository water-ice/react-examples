import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Combo from '@components/Test/Dnd/Combo/Combo';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
@DragDropContext(HTML5Backend)
class Container extends Component {
	render() {
		return (
			<div className="g-none-select">
				<Combo />
			</div>
		);
	}
}

Container.propTypes = {};

export default Container;