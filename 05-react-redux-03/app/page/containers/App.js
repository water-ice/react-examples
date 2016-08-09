import React from 'react';
import {Link , IndexLink} from 'react-router';
class App extends React.Component {
    render () {
        return (
            <div>
                <h1>react-router-redux</h1>
                <hr />
                <ul>
                    <li><IndexLink to="/">Home</IndexLink></li>
                    <li><Link to="/test">Test</Link></li>
                    <li><Link to="/counter">Counter</Link></li>
                    <li><Link to="/todomvc">TodoMVC</Link></li>
                    <li><Link to="/async">Async</Link></li>
                </ul>
                <p>嵌套组件：</p>
                {this.props.children}
            </div>
        );
    }
};
export default App;