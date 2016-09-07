import React, { Component, PropTypes } from 'react';
import { Result } from 'antd-mobile';

const ResultExample = () => {
	return(
			<Result
			  imgUrl="https://os.alipayobjects.com/rmsportal/XMUAssczvVftDHX.png"
			  title="网络无法连接"
			  brief="请查看网络连接或稍后重试"
			  buttonText="刷新"
			  buttonType="primary"
			  buttonClick={() => alert('点击了按钮')}
			/>
		);
};
	

export default ResultExample;