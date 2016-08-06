import React from 'react';
import {Link , IndexLink} from 'react-router';
class App extends React.Component {
    render () {
        return (
            <div>
                <h1>React Router</h1>
                <hr />
                <ul>
                    <li><IndexLink to="/">Home</IndexLink></li>
                    <li><Link to="/test">Test</Link></li>
                    <li><Link to="/counter">Counter</Link></li>
                </ul>
                <p>嵌套组件：</p>
                {this.props.children}
            </div>
        );
    }
};
export default App;