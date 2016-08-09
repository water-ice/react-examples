import {
    connect,
} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as AsyncActions from '../actions/async';
import Async from '../components/async/Async';

function mapStateToProps(state) {
    const {
        selectedReddit,
        postsByReddit
    } = state;
    const {
        isFetching,
        lastUpdated,
        items: posts
    } = postsByReddit[selectedReddit] || {
        isFetching: true,
        items: []
    };

    return {
        selectedReddit,
        posts,
        isFetching,
        lastUpdated
    };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(AsyncActions, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(Async);