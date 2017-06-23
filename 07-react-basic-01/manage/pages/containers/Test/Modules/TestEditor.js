import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Content from '@components/Test/Editor/Content';
class TestEditor extends Component {
	render() {
		return (
			<div>
				<Content />
			</div>
		);
	}
}

TestEditor.propTypes = {};

export default TestEditor;