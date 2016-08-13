import { connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ListAction from '../actions/list';
function mapStateToProps(state, ownProps)  {   
    return {
        args: state.args,
        tabs: state.tabs,
        news: state.news,
        details: state.details,
        comments: state.comments,
        spinLoading: state.spinLoading,
        listLoading: state.listLoading,
    };
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
    return bindActionCreators(ListAction, dispatch);
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
);