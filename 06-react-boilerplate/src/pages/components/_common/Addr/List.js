import React, {PropTypes} from 'react';
import Item from './Item';
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
        const {
            onClose,
            itemArr,
            itemObj,
            selectId,
            onType,
            onChangeAddr
        } = this.props;
        return (
            <div className="w-reset">
                <div className="w-bg-fixed w-close" onClick={onClose}></div>
                <div className="w-bg-white w-fixed w-row">
                    <ul className="address-item w-row w-pd-l w-height-30">
                        {itemArr.map((item, index) =>{
                            const itemData = itemObj[item];
                            return (
                                <Item  key = {item}
                                       item = {item}
                                       itemData = {itemData}
                                       selectId = {selectId}
                                       onType = {onType}
                                       onChangeAddr = {onChangeAddr}
                                       onClose = {onClose}
                                />
                            );
                        })}
                    </ul>
                    <div className="w-lh-40 w-tc w-bg-pink" 
                         data-type={1}
                         onClick={onType}
                    >
                         添加新地址
                    </div>
                </div>
            </div>
        );
    }
}

List.propTypes = {

};

export default List;