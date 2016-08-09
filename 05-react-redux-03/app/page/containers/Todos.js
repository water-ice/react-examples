import React, { Component , PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Header from '../components/todos/header';
import MainSection from '../components/todos/mainSection';
import * as TodoActions from '../actions/todos';

class Todos extends Component {
	render() {
		const { todos, actions } = this.props;
		//console.info('Todos.js');
		//console.log(this.props);
		return (
      		<div className="todo-mvc">
        		<Header addTodo={actions.addTodo}/>
        		<MainSection todos={todos} actions={actions} />
      		</div>
		);
	}
}

Todos.propTypes = {
	todos: PropTypes.array.isRequired,
	actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		todos: state.todos
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(TodoActions, dispatch)
	};
}

export default connect(mapStateToProps,mapDispatchToProps)(Todos);