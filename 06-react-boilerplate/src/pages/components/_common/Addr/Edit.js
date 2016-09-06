import React, {PropTypes} from 'react';
//import district from 'antd-mobile/site/data/district';
import {List,InputItem,Toast,Picker} from 'antd-mobile';
import { createForm } from 'rc-form';
import {dataValidity} from 'utils';
import { getItem, setItem ,delItem } from 'utils';
import net from 'net';
import API_ROOT from 'apiRoot';
@createForm()
class Create extends React.Component {
    constructor(props,context) {
        super(props);
        this.state = {
            district:null
        };
        this.handleSaveAddr = this.handleSaveAddr.bind(this);
        this.handleDeleteAddr = this.handleDeleteAddr.bind(this);
        this.handleGetDistrict = this.handleGetDistrict.bind(this);
    }
    componentWillMount(){
    }
    componentWillUnmount () {
        console.info('卸载组件');
    }
    handleSaveAddr(event){
        const {
            onChangeAddr,
            itemData
        } = this.props;
        const {
            id,
        }=itemData;
        this.props.form.validateFields((errors, value) => {
            if(errors){
               for(let i in errors){
                   if(errors[i]){
                       Toast.info(errors[i].errors[0].message);
                       break;
                   }
               }
               return false; 
            }

            if(id){
                value.id = id;
            }
            onChangeAddr&&onChangeAddr(value);
        });
    }
    handleDeleteAddr(event){
        const {
            selectId,
            itemData,
            onClose
        } = this.props;
        const {
            id,
        }=itemData;
        if(id ==selectId){
            Toast.info('选中状态无法删除');
            return !0;
        }
        /*异步请求数据，不放入redux*/
        let param = {id};
        Toast.loading(null, 0);
        net.ajax({
            url: API_ROOT['_ADDR_DELETE_LIST'],
            type: 'DELETE',
            param,
            success: (res) => {
                Toast.hide();
                onClose&&onClose();
            },
            error: (res) => {
                Toast.hide();
                onClose&&onClose();
                alert('error');
            }
        });

    }
    handleGetDistrict(event){
        /*异步请求数据，不放入redux*/
        let param = {};
        let localData = getItem('area');
        Toast.loading(null, 0);
        net.ajax({
            url: API_ROOT['_ADDR_GET_DISTRICT'],
            type: 'GET',
            param,
            localData,
            success: (res) => {
                Toast.hide();
                setItem('area', res);
                this.setState({
                    district:res.data
                });
            },
            error: (res) => {
                reject();
            }
        });
    }
    render() {
        const {
            onClose,
            itemData,
            selectId
        } = this.props;
        const {
            id,
            consignee,
            province,
            city,
            district,
            province_name,
            city_name,
            district_name,
            mobile,
            address,
            zipcode
        }=itemData;
        const { getFieldProps, getFieldError} = this.props.form;
        let errors;
        return (
            <div className="w-reset">
                <div className="w-bg-fixed w-close" onClick={onClose}></div>
                <div className="w-bg-white w-fixed w-row">
                    {/*<p className="close-position tc">{itemData?'编辑收货地址':'新建收货地址'}<i className="iconfont close">&#xe623;</i></p>*/}
                    <div className="w-height-600">
                        <List>
                            <List.Header>{itemData?'编辑收货地址':'新建收货地址'}</List.Header>
                            <List.Body>
                                <InputItem             
                                    {...getFieldProps('consignee', {
                                            validateTrigger: 'onBlur',
                                            initialValue: consignee||'',
                                            rules: [
                                                {
                                                    required: true,
                                                    name:"收货人",
                                                    validator:dataValidity
                                                }
                                            ]
                                        }
                                    )}
                                    clear
                                    type="text"
                                    placeholder="请填写收货人姓名"
                                >收货人</InputItem>
                                <InputItem      
                                    {...getFieldProps('mobile', {
                                            validateTrigger: 'onBlur',
                                            initialValue: mobile||'',
                                            rules: [
                                                {
                                                    required: true,
                                                    type:"validMobile",
                                                    name:"手机号码",
                                                    validator:dataValidity
                                                }
                                            ]
                                        }
                                    )}
                                    clear
                                    type="phone"
                                    placeholder="请填写手机号码"
                                >手机号码</InputItem>
                                <Picker
                                    {...getFieldProps('district', {
                                            initialValue: id?[province,city,district]:['330000','330100','330105'],
                                            rules: [
                                                {
                                                    required: true,
                                                    message:"地区必填",
                                                    name:"地区",
                                                    validator:dataValidity
                                                }
                                            ]
                                        }
                                    )}                            
                                    extra={id?`${province_name},${city_name},${district_name}`:'浙江省,杭州市,拱墅区'} 
                                    title="选择地区" 
                                    data={this.state.district} 
                                    
                                >
                                    <List.Item  arrow="horizontal"
                                                className = "init-item"   
                                                onClick = {this.handleGetDistrict} 
                                    >省市区选择</List.Item>
                                </Picker>
                                <InputItem
                                    {...getFieldProps('address', {
                                            validateTrigger: 'onBlur',
                                            initialValue: address||'',
                                            rules: [
                                                {
                                                    required: true,
                                                    name:"收货地址",
                                                    validator:dataValidity
                                                }
                                            ]
                                        }
                                    )}
                                    clear
                                    type="text"
                                    placeholder="请输入街道门牌信息"
                                >详细地址</InputItem>
                                <InputItem
                                    {...getFieldProps('zipcode', {
                                            validateTrigger: 'onBlur',
                                            initialValue: zipcode||'',
                                            rules: [
                                                {
                                                    type:"validZipCode",
                                                    validator:dataValidity
                                                }
                                            ]
                                        }
                                    )}
                                    clear
                                    type="number"
                                    placeholder="请输入邮政编码"
                                >邮政编码</InputItem>
                            </List.Body>
                        </List>
                    </div>
                    <div className="w-tc w-lh-80 w-bg-pink" onClick = {this.handleSaveAddr}>保存</div>
                    {id&&<div className="w-tc w-lh-80 w-bg-black-2 w-m-t" onClick = {this.handleDeleteAddr}>删除</div>}
                </div>
            </div>
        );
    }
}

Create.propTypes = {
    itemData:React.PropTypes.object,
    form:React.PropTypes.object,
    selectId:React.PropTypes.string
};
export default Create;