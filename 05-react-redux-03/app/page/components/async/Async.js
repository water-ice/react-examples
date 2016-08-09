import React, {
    Component,
    PropTypes
} from 'react';
import Picker from './Picker';
import Posts from './Posts';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleRefreshClick = this.handleRefreshClick.bind(this);
    }

    //初始化渲染后触发
    componentDidMount() {
        //return false;
        console.info('执行 componentDidMount');
        const {
            fetchPostsIfNeeded,
            selectedReddit
        } = this.props;
        fetchPostsIfNeeded(selectedReddit);
    }

    //每次接受新的props触发
    componentWillReceiveProps(nextProps) {
        //有两次；第一次是REQUEST_POSTS 第二次是 RECEIVE_POSTS
        console.info('执行 componentWillReceiveProps');
        //console.log(nextProps);
        return false;
        if (nextProps.selectedReddit !== this.props.selectedReddit) {
            const {
                fetchPostsIfNeeded,
                selectedReddit
            } = nextProps;
            fetchPostsIfNeeded(selectedReddit);
        }
    }

    handleChange(nextReddit) {
        this.props.selectReddit(nextReddit);
    }

    handleRefreshClick(e) {
        e.preventDefault();

        const {
            invalidateReddit,
            fetchPostsIfNeeded,
            selectedReddit
        } = this.props;
        invalidateReddit(selectedReddit);
        fetchPostsIfNeeded(selectedReddit);
    }

    render() {
        console.info('执行render');
        console.log(this.props);
        const {
            selectedReddit,
            posts,
            isFetching,
            lastUpdated
        } = this.props;
        return (
            <div>
                <Picker value={selectedReddit}
                        onChange={this.handleChange}
                        options={[ 'reactjs', 'frontend' ]} />
                <p>
                  {lastUpdated &&
                    <span>
                      Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
                      {' '}
                    </span>
                  }
                  {!isFetching &&
                    <a href="#"
                       onClick={this.handleRefreshClick}>
                      Refresh
                    </a>
                  }
                </p>
                {isFetching && posts.length === 0 &&
                  <h2>Loading...</h2>
                }
                {!isFetching && posts.length === 0 &&
                  <h2>Empty.</h2>
                }
                {posts.length > 0 &&
                  <div style={{ opacity: isFetching ? 0.5 : 1 }}>
                    <Posts posts={posts} />
                  </div>
                }
            </div>
        );
    }
}

App.propTypes = {
    selectedReddit: PropTypes.string.isRequired,
    posts: PropTypes.array.isRequired,
    isFetching: PropTypes.bool.isRequired,
    lastUpdated: PropTypes.number,
    //dispatch: PropTypes.func.isRequired
};