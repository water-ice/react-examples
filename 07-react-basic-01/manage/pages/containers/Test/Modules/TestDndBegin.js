import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Tutorial from '@components/Test/Dnd/Begin/Tutorial/Tutorial';
import Single from '@components/Test/Dnd/Begin/Single/Single';
import Sortable from '@components/Test/Dnd/Begin/Sortable/Sortable';
import Layer from '@components/Test/Dnd/Begin/Layer/Layer';

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
@DragDropContext(HTML5Backend)
class Container extends Component {
	render() {
		return (
			<div className="g-none-select">
				<Tutorial />
				<Single />
				<Sortable />
				<Layer />
			</div>
		);
	}
}

Container.propTypes = {};

export default Container;