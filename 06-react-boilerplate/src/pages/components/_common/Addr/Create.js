import React, {PropTypes} from 'react';
//import district from 'antd-mobile/site/data/district';
import {List,InputItem,Toast,Picker,WingBlank} from 'antd-mobile';
import { createForm } from 'rc-form';
import {dataValidity} from 'utils';
import { getItem, setItem ,delItem } from 'utils';
import net from 'net';
import API_ROOT from '../../../constants/apiRoot';
@createForm()
class Create extends React.Component {
    constructor(props,context) {
        super(props);
        this.state = {
            district:null
        };
        this.handleSaveAddr = this.handleSaveAddr.bind(this);
        this.handleGetDistrict = this.handleGetDistrict.bind(this);
    }
    componentWillMount(){
    }
    componentWillUnmount () {
        console.info('卸载组件');
    }
    handleSaveAddr(event){
        this.props.form.validateFields((errors, value) => {
            if(errors){
               for(let i in errors){
                   if(errors[i]){
                       Toast.info(errors[i].errors[0].message);
                       break;
                   }
               } 
            }
            
        });
    }
    handleGetDistrict(event){
        /*异步请求数据，不放入redux*/
        let param = {};
        let localData = getItem('area');
        Toast.loading(null, 0);
        net.ajax({
            url: API_ROOT['_DISTRICT_GET_MAIN'],
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
            itemArr,
            itemObj,
            selectId
        } = this.props;
        const { getFieldProps, getFieldError} = this.props.form;
        let errors;
        return (
            <div className="w-reset">
                <div className="w-bg-fixed w-close" onClick={onClose}></div>
                <div className="w-bg-white w-fixed w-row">
                    {/*<p className="close-position tc">新建收货地址<i className="iconfont close">&#xe623;</i></p>*/}
                    <div className="w-height-30">
                        <List>
                            <List.Header>新建收货地址</List.Header>
                            <List.Body>
                                <InputItem             
                                    {...getFieldProps('consignee', {
                                            validateTrigger: 'onBlur',
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
                                    format="text"
                                    placeholder="请填写收货人姓名"
                                >收货人</InputItem>
                                <InputItem      
                                    {...getFieldProps('mobile', {
                                            validateTrigger: 'onBlur',
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
                                    format="phone"
                                    placeholder="请填写手机号码"
                                >手机号码</InputItem>
                                <Picker
                                    {...getFieldProps('district', {
                                            initialValue: ['330000','330100','330105'],
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
                                    extra="浙江省,杭州市,拱墅区" 
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
                                    format="text"
                                    placeholder="请输入街道门牌信息"
                                >详细地址</InputItem>
                                <InputItem
                                    {...getFieldProps('zipcode', {
                                            validateTrigger: 'onBlur',
                                            rules: [
                                                {
                                                    type:"validZipCode",
                                                    validator:dataValidity
                                                }
                                            ]
                                        }
                                    )}
                                    clear
                                    format="number"
                                    placeholder="请输入邮政编码"
                                >邮政编码</InputItem>
                            </List.Body>
                        </List>
                    </div>
                    <div className="w-tc w-lh-40 w-bg-pink" onClick = {this.handleSaveAddr}>保存</div>
                </div>
            </div>
        );
    }
}

Create.propTypes = {

};
export default Create;