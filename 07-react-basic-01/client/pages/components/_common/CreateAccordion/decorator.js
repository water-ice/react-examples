import React, { Component } from 'react';
import CreateAccordion from './CreateAccordion';

const getDisplayName = WrappedComponent => WrappedComponent.displayName || WrappedComponent.name || 'Component';
// decorator
export default (options = {}) => function createAccordion(WrappedComponent) {
	return class CreateEchartsDecorated extends Component {
		constructor() {
			super();
			this.displayName = `CreateAccordion${getDisplayName(WrappedComponent)}`;
		}

		render() {
			return (
				<CreateAccordion {...options}>
					<WrappedComponent {...this.props} ref="WrappedComponent" />
				</CreateAccordion>
			);
		}
	};
};

