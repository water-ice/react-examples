'use strict';
/*eslint no-console: 0*/
import React, { Component } from 'react';
class Hello extends Component {
    constructor(props) {
    	console.log(props);
        super(props);

        // 设置 initial state
        this.state = {
            text: props.initialValue || 'placeholder'
        };

    }

    handleChange = (event) => {
        this.setState({
            text: event.target.value
        });
        console.log(event.target.value);
    }
    render() {
        return (
            <div>
                Type something:
                <input onChange={this.handleChange}
               value={this.state.text} />
            </div>
        );
    }
}
Hello.propTypes = {
    initialValue: React.PropTypes.string
};
Hello.defaultProps = {
    initialValue: 'hello world'
};
module.exports = Hello;
