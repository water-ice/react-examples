// <ImgsPicker
// 	imgs={cover_img?[cover_img]:[]}
// 	limit={1}
// 	ref = "cover_img"
// />
import React, { Component, PropTypes } from 'react';
import {message} from 'antd';

import lrz from 'lrz';//压缩图片后上传
import './ImgsPicker.scss';
import ImgItem from './ImgItem';
/**
 * 不需要redux
 */
import {filterBase64} from '@utils/utils';
import net from '@utils/net';
import API_ROOT from '@constants/apiRoot';

import {OSS_CDN} from '@constants/constants';
import pureRender from 'pure-render-decorator';
@pureRender
class ImgsPicker extends Component {
	constructor(props, context) {
		super(props, context);	
		this.isLoad = 0;
		this.handleFile = this.handleFile.bind(this);
		this.promiseLrz=this.promiseLrz.bind(this);
		this.promiseOss=this.promiseOss.bind(this);
		this.promiseServer=this.promiseServer.bind(this);
		this.promiseState=this.promiseState.bind(this);

		this.handleDelete = this.handleDelete.bind(this);
	}
	componentWillMount() {
		this.state={
			imgs:this.props.imgs||[]
		};
	}
	componentWillReceiveProps(nextprops){
		const { imgs } = nextprops;
		if(imgs.length>0 && this.isLoad==0){
			this.setState({
				imgs:imgs||[]
			},()=>{
				this.isLoad=1;
			});
		}
	}
	handleFile(event){
		let files=event.target.files;
		let length=files.length;
		const {
			limit
		} = this.props;
		const {
			imgs
		} = this.state;
		if(limit>1&&limit<imgs.length+length){
			message.error(`最多上传${limit}张图`,1.5);
			return false;
		}
		let imgBase64;
		let ossUrl;
		let count=0;
		let success=0;
		let fail=0;
		// Toast.hide();//hack
		(async () => {
			for (let i=0;i<length;i++) {
				try {
					message.destroy(); //hack
					message.loading(`${count++}/${length}`,0);
					//start
					imgBase64 = await this.promiseLrz(files[i]);
					ossUrl = await this.promiseOss(imgBase64);
					//await this.promiseServer(ossUrl);
					await this.promiseState(ossUrl);
					//end
					success++;
				} catch (err) {
					fail++;
					message.destroy(); //hack
					console.error(err);
				}
			}
			message.destroy(); //hack
			message.success(`上传结果：${success}张成功，${fail}张失败`,3);
		})();
	}
	promiseLrz(file){//压缩图片
		return new Promise((resolve, reject) => {
			let reader;
			reader = new FileReader();
			reader.onload = () => {
				let  img = reader.result;
				//压缩图片后上传
				lrz(
					img,
					{
						width:800,
						quality: 0.7, 
						fieldName: "Filedata"
					}
				).then( (rst) => {
					// 先上传到oss
					resolve(rst.base64);
				}).catch( (err) => {
					reject('上传失败..');
				});

			  };
			reader.readAsDataURL(file);
		});
	}
	promiseOss(img){//先上传到oss
		return new Promise((resolve, reject) => {
			let param = {
				upfile: filterBase64(img)
			};
			net.ajax({
				url: API_ROOT['_OSS_IMG_POST'],
				type: 'POST',
				param,
				success: (res) => {
					const imgUrl = res&&res.url?`${OSS_CDN}${res.url}`:img;
					resolve(imgUrl);
				},
				error: (res) => {
					message.error(`${res.msg}`,1.5);
					reject('oss error');
				}
			});
		});
	}
	/**
	 * 外部函数
	 */
	promiseServer(oss){
		//必须是Promise对象,否则整个项目运行不了
		this.props.promiseServerFn&&this.props.promiseServerFn(oss);
	}
	/**
	 * 内部处理
	 */
	promiseState(ossUrl){
		// const { handleImgChange } = this.props;
		return new Promise((resolve, reject) => {
			let {
				limit
			} = this.props;
			if(limit==1){
				this.setState({
					imgs:[ossUrl]
				},()=>{
					resolve();
				});
			}else{
				console.log(1);
				this.setState({
					imgs:[...this.state.imgs,ossUrl]
				},()=>{
					resolve();
				});
			}
			
		});
	}
	handleDelete(img){
		let {
			imgs
		} = this.state;
		imgs = imgs.filter(value => value != img);
		this.setState({
			imgs
		});
		
	}
	getImgs(){
		return this.state.imgs;
	}
	render() {
		const {
			limit
		} = this.props;
		const {
			imgs
		} = this.state;
		// image/* -> image/jpg,image/jpeg,image/png,image/gif,image/bmp 处理chorme下卡断
		return(
			<div className={limit==1?'rc-imgs-cover-picker':'rc-imgs-picker'}>
				{/*不使用图片预览组件*/}
				<div className="_imgs">
					{
						imgs.map((item,index)=>{
							return (
								<ImgItem key={index+item} img={item} onDelete={this.handleDelete}/>
							);
						})
					}
					{
						limit==1&&(imgs.length==0&&<img className="_img" />)
					}
					<div className="_border">
						<div className="_input">
						{
							limit==1?'点击上传':'+'
						}
							<input 
								type="file" 
								accept="image/jpg,image/jpeg,image/png,image/gif,image/bmp" 
								multiple 
								onChange={this.handleFile}
							/>
						</div>
					</div>
				</div>
				
			</div>
		);
	}
}
ImgsPicker.PropTypes = {
	content:PropTypes.string,
	/**
	 * 限制图片数量
	 */
	limit:PropTypes.number,
	/**
	 * 图片资源
	 */
	imgs:PropTypes.array,
	/**
	 * 将图片上传到服务器，1张1张上传，可调整一次性上传
	 */
	promiseServerFn:PropTypes.func,
};
ImgsPicker.defaultProps = {
	limit: 3,
	imgs:[],
	content:"上传图片"
};
export default ImgsPicker;