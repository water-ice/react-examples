import React, {PropTypes} from 'react';
class List extends React.Component {
    constructor(props,context) {
        super(props);
    }
    componentWillMount(){
    }
    componentWillUnmount () {
        console.info('卸载组件');
    }
    render() {
        return (
            <li>
                <i className="iconfont w-col-2 w-tc icon-not_selected" />
                <div className="w-col-8">
                    <div>收货人:  
                        <span>21312</span> 
                        <span className="w-fr">2121</span>
                    </div>
                    <div className="w-twoline">地址: <span>12321</span></div>
                </div>
                <i className="iconfont w-col-2 icon-bianji" />
            </li>
        );
    }
}

List.propTypes = {

};

export default List;