import {
	bindActionCreators
} from 'redux';
import {
	connect
} from 'react-redux';
import * as HomeActions from '../../actions/home';
import Home from './Modules/Home';

function mapStateToProps(state) {
	return {
		home: state.home
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators(HomeActions, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);