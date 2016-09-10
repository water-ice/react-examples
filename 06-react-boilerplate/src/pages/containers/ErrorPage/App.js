import React, { Component, PropTypes } from 'react';
import { Result } from 'antd-mobile';
const ResultPage = () => {
	return(
			<Result
			  imgUrl="https://os.alipayobjects.com/rmsportal/XMUAssczvVftDHX.png"
			  title="数据出错了"
			  brief="请查看网络连接或稍后重试"
			  buttonText="返回"
			  buttonType="primary"
			  buttonClick={() => _global.history.push('/')}
			/>
		);
};
export default ResultPage;