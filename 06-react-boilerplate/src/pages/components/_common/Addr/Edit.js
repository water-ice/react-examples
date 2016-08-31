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
        let {
            onClose,
            itemArr,
            itemObj,
            selectId
        } = this.props;
        return (
            <div className="w-reset">
                <div className="w-bg-fixed w-close" onClick={onClose}></div>
                <div className="w-bg-white w-fixed w-row">
                    <ul className="address-item w-row w-pd-l w-height-30">
                        1321321
                    </ul>
                    <div className="w-lh-40 w-tc w-bg-pink w-white">添加新地址</div>
                </div>
            </div>
        );
    }
}

List.propTypes = {

};

export default List;