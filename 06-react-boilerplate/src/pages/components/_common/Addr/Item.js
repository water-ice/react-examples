import React, {PropTypes} from 'react';
import classnames from 'classnames';
class List extends React.Component {
    constructor(props,context) {
        super(props);
        this.handleChangeAddr = this.handleChangeAddr.bind(this);
    }
    componentWillMount(){
    }
    componentWillUnmount () {
        console.info('卸载组件');
    }
    handleChangeAddr(event){
        event.preventDefault();
        const {onChangeAddr,itemData} = this.props;
        const {
            item,
            selectId,
            onClose
        } = this.props;
        const selected = (item == selectId);
        if(selected){
            onClose&&onClose();
        }else{
            onChangeAddr&&onChangeAddr(itemData);
        }
    }   
    render() {
        //console.log(this.props)
        const {
            item,
            itemData,
            selectId,
            onType
        } = this.props;
        const {
            consignee,
            mobile,
            province_name,
            city_name,
            district_name,
            address
        } = itemData;
        const selected = (item == selectId);
        return (
            <li>
                <i className={
                                classnames(
                                    "iconfont w-col-2 w-tc",
                                    (selected? "icon-circle-select" : "icon-not-select w-black-1")
                                )
                            }
                    onClick = {this.handleChangeAddr}
                />
                <div className="w-col-8" onClick = {this.handleChangeAddr}>
                    <div>收货人:  
                        <span>{consignee}</span> 
                        <span className="w-fr">{mobile}</span>
                    </div>
                    <div className="w-twoline">
                        地址:
                        <span>    
                            {province_name}&nbsp;
                            {city_name}&nbsp;
                            {district_name}&nbsp;
                            {address} 
                        </span>
                    </div>
                </div>
                <i className="iconfont w-col-2 icon-edit" onClick = {onType} data-type="2" data-id={item}/>
            </li>
        );
    }
}

List.propTypes = {
    item:React.PropTypes.number,
    itemData:React.PropTypes.object,
    selectId:React.PropTypes.number,
    onChangeAddr:React.PropTypes.func,
    onClose:React.PropTypes.func,
    onType:React.PropTypes.func,
};

export default List;