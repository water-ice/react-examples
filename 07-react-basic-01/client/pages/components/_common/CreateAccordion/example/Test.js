import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createAccordion } from '../index';
const refName = "content";
@createAccordion({ refName })
class Item extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		const { accordion } = this.props;
		return (
			<div onClick={accordion.eventHandler}>
				<i className={`${accordion.icon}`} />
				<div ref={refName} className={accordion.content}>
					<div>
						{accordion.icon}-{accordion.content}
					</div>
				</div>
			</div>
		);
	}
}
export default Item;