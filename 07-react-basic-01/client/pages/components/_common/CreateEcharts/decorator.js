import React, { Component } from 'react';
import CreateEcharts from './CreateEcharts';

const getDisplayName = WrappedComponent => WrappedComponent.displayName || WrappedComponent.name || 'Component';
// decorator
export default (options = {}) => function createEcharts(WrappedComponent) {
	return class CreateEchartsDecorated extends Component {
		constructor() {
			super();
			this.displayName = `CreateEcharts${getDisplayName(WrappedComponent)}`;
		}

		render() {
			return (
				<CreateEcharts {...options}>
					<WrappedComponent {...this.props} ref="WrappedComponent" />
				</CreateEcharts>
			);
		}
	};
};

