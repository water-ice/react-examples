import React, {
	Component
} from 'react';
import {
	Form,
	Input,
	Button,
	message
} from 'antd';
import * as types from '@constants/actions/login';
import { setCookie,dataValidity } from '@utils/utils';
import { createForm } from 'rc-form';
import './Form.scss';
import Verification from './VerificationCode';

const FormItem = Form.Item;
const formItemLayout = {
	labelCol: {
		xs: {
			span: 24
		},
		sm: {
			span: 6
		},
	},
	wrapperCol: {
		xs: {
			span: 24
		},
		sm: {
			span: 14
		},
	},
};
const tailFormItemLayout = {
	wrapperCol: {
		xs: {
			span: 24,
			offset: 0,
		},
		sm: {
			span: 14,
			offset: 6,
		},
	},
};
const formStyle = {
	width: 400,
	margin: '0 auto'
};
@createForm()
class LoginForm extends Component {
	constructor(props, context) {
		super(props, context);
		this.handleSubmit = ::this.handleSubmit;
	}
	handleSubmit(event) {
		event.preventDefault();
		const { validateFields } = this.props.form;
		validateFields((err, values) => {
			if (!err) {
				const password = values.password;
				const userName = values.userName;
				const verification = values.verification;
				const verify_code = this.refs.verify_code.state.verify_code;
				if(verification!=verify_code){
					message.error('验证码输入有误',1.5);
					return false;
				}
				message.destroy();
				message.loading('提交中...', 0);

				let url = types.LOGIN_MAIN_POST;
				let param = {
					userName:userName,
					password:password
				};

				let params = {
					param: param,
					ajaxType: 'POST',
					onSuccess: (res)=> {
						message.destroy();
						// setCookie('userManage',{token:res.token});
						// _global.history.push('/material');
					},
					onError: (res)=> {
						message.destroy();
						message.error(res.msg,1.5);
					}
				};
				this.props.actions.request(url, params, {});

			}else{
				for(let key in err){
					message.error(err[key].errors[0].message,1.5);
					break;
				}
			}
		});
	}
	render() {
		const { getFieldProps, getFieldError} = this.props.form;
		return (
			<Form onSubmit={this.handleSubmit} className="pages-login-form" style={formStyle}>
				<FormItem {...formItemLayout} label="账号">
					<Input placeholder="账号"
						{...getFieldProps('userName', {
								initialValue: '',
								rules: [
									{
										required: true,
										name:"账号",
										validator:dataValidity
									}
								]
							}
						)}
					/>
				</FormItem>
				<FormItem {...formItemLayout} label="密码">
					<Input 
						{...getFieldProps('password', {
								initialValue: '',
								rules: [
									{
										required: true,
										name:"密码",
										validator:dataValidity
									}
								]
							}
						)} 
						type="password" 
						placeholder="密码"
					/>
				</FormItem>
				<FormItem {...formItemLayout} label="验证码" style={{}}>
					<Input 
						{...getFieldProps('verification', {
								initialValue: '',
								rules: [
									{
										required: true,
										name:"验证码"
									}
								]
							}
						)} 
						type="verification" 
						placeholder="验证码"
						style={{width:150}}
					/>
					<Verification ref="verify_code" />
				</FormItem>
				<FormItem {...tailFormItemLayout} style={{textAlign:'center'}}>
					<Button 
						type="primary" 
						htmlType="submit" 
						className="login-form-button" 
						style={{width:'160px'}}
					>登录</Button>
				</FormItem>
				
			</Form>
		);
	}
}
export default LoginForm;