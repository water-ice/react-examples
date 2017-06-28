import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Input from '../Input';
import { createForm } from 'rc-form';
import { dataValidity } from '@common/js/utils/utils';
@createForm({ wrappedComponentRef: true })
class Test extends Component {
	constructor(props, context) {
		super(props, context);
		this.handleSubmit = ::this.handleSubmit;
	}
	handleSubmit(){
		this.props.form.validateFields((errors, value) => {
			if (errors) {
				for ( let i in errors) {
					if (errors[i]) {
						console.log(errors[i].errors[0].message);
						break;
					}
				}
				return false;
			}
			console.log("验证时间");
		});
	}
	render() {
		const { getFieldProps } = this.props.form;
		return (
			<div>
				<Input
					{...getFieldProps('mobile', {
							validateTrigger: 'onBlur',
							initialValue: '',
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
					classNameInput={`g-orange`}
					styleInput={{color:'red'}}
					type={`tel`}
					placeholder={`请填写手机号码`}
					clear
				>手机:</Input>
				<Input
					{...getFieldProps('addr', {
							validateTrigger: 'onBlur',
							initialValue: '',
							rules: [
								{
									required: true,
									name:"地址",
									validator:dataValidity
								}
							]
						}
					)}
					type={`text`}
					placeholder={`请填写地址`}
					clear
				>地址:</Input>
				<Input
					{...getFieldProps('sms', {
							validateTrigger: 'onBlur',
							initialValue: '',
							rules: [
								{
									required: true,
									name:"地址",
									validator:dataValidity
								}
							]
						}
					)}
					type={`text`}
					placeholder={`短信码`}
					onSms = {() => {}}
					clear
				>短信:</Input>
				<div onClick={this.handleSubmit}>提交</div>
			</div>
		);
	}
}
Test.propTypes = {
};
export default Test;