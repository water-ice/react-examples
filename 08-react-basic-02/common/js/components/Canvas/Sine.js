/**
 * <Sine />
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
/**
 * 正弦波公式 y = sin(x);
 * 只显示上半部分
 */
class Sine extends Component {
	constructor(props) {
		super(props);
		this.drawCanvas = ::this.drawCanvas;
		this.drawSine = ::this.drawSine;

		this.seconds = [];
		// 周期
		this.T = [];
	}
	componentDidMount() {
		const { fillArr, tArr, seconds } = this.props;
		const length = fillArr.length;
		// 初始值
		this.seconds  =  Array.from({ length },() => 0);
		this.T  = Array.from({ length },() => 0);
		this.interval = tArr.map(t => 1 / (1000 / 10) / (t / 2)); //1/(1000ms/10ms,1秒内的刷新次数)/周期的一半（2*Pi 是一个完整的正弦波）

		// 获取节点
		let canvas = document.getElementById("sineCanvas");
		this.ctx = canvas.getContext("2d");
		// canvas高宽
		this.height = canvas.offsetHeight;
		this.width = canvas.offsetWidth;

		this.drawCanvas();
	}
	componentWillUnmount(){
		// 清除
		cancelAnimationFrame(this.looper);
	}
	drawCanvas(){
		const { fillArr, strokeArr, T } = this.props;
		this.ctx.clearRect(0, 0, this.width, this.height);
		for (let i = 0; i < fillArr.length; i++) {
			this.ctx.fillStyle = fillArr[i];
			this.ctx.strokeStyle = strokeArr[i];
			this.ctx.lineWidth = 2;
			// 开始绘制
			this.ctx.beginPath();
			this.drawSine(this.T[i], i);
			// 闭合路径
			this.ctx.closePath();
			// 填充路径
			this.ctx.fill();
			this.ctx.stroke();
			// 更新之后在渲染
			this.seconds[i] = this.seconds[i] + this.interval[i];
			this.T[i] = this.seconds[i] * Math.PI; // 2*Pi 是一个完整的正弦波
		}
		
		/**
		 * 此处当10ms计算
		 * 跟着浏览器的绘制走，
		 * 如果浏览设备绘制间隔是16.7ms，那我就这个间隔绘制；
		 * 如果浏览设备绘制间隔是10ms, 我就10ms绘制
		 */
		this.looper = requestAnimationFrame(this.drawCanvas);
	}
	drawSine(time, index){
		const { offsetYArr, xArr, peakArr, xtArr  } = this.props;
		let x = time;
		let y = Math.sin(x);
		let start_x = 0; // 开始的比划
		let start_y = peakArr[index] * y + offsetYArr[index];
		this.ctx.moveTo(start_x, start_y);
		
		for (let i = 0; i <= this.width; i += 2) {
			x = time + 2 * Math.PI * (i + xArr[index]) / (xtArr[index] / 4); // 每1像素对应的弧度，以及偏移值
			y = Math.sin(x);
			this.ctx.lineTo(i, peakArr[index] * y + offsetYArr[index]);
		}
		// 正弦波下半部闭合
		this.ctx.lineTo(this.width, this.height);
		this.ctx.lineTo(0, this.height);
		this.ctx.lineTo(start_x, start_y);
	}
	render() {
		const { id, height, width, style } = this.props;
		return (
			<canvas id={id} style={{width, height,...style}} />
		);
	}
}
Sine.propTypes={
	id: PropTypes.string,
	/**
	 * 正弦波填充颜色
	 */
	fillArr: PropTypes.array,
	/**
	 * 笔刷的颜色
	 */
	strokeArr: PropTypes.array,
	/**
	 * 一个周期的长度，会被缩放值影响
	 */
	xtArr: PropTypes.array,
	/**
	 * 正弦波的周期，单位s,（正数:->,负数:<-）
	 */
	tArr: PropTypes.array,
	/**
	 * 波与波间距，受xtArr影响
	 */
	xArr: PropTypes.array,
	/**
	 * 峰值,决定y的最大值
	 */
	peakArr: PropTypes.array,
	/**
	 * y轴偏移值，要大于峰值（utit，否者就不能显示全部）
	 */
	offsetYArr: PropTypes.array,
	/**
	 * 样式
	 */
	style: PropTypes.object
};
Sine.defaultProps={
	id:"sineCanvas",
	fillArr:[
		"rgba(255,255,255,0.2)",
		"rgba(255,255,255,0.3)",
		"rgba(255,255,255,0.1)"
	],
	strokeArr:[
		"rgba(255,255,255,0.205)",
		"rgba(255,255,255,0.305)",
		"rgba(255,255,255,0.105)"
	],
	// xtArr 数值一样代表一个周期的x是等距的
	xtArr:[window.innerWidth * 1.3, window.innerWidth * 1.5, window.innerWidth * 1.4],
	// tArr 数值一样代表相同周期同步移动
	tArr: [11, 7, 9],
	xArr: [0, 60, 120], // 最好不要超过 xtArr/4
	peakArr: [40, 40, 40],
	offsetYArr: [80, 80, 80],
	height: 160,
	// offsetYArr: [100, 100, 100],
	// peakArr: [60, 60, 60],
	// height: 200,
	width: "100%",
	style: {}
};
export default Sine;

