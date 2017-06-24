import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
class App extends Component {
	constructor(props, context) {
		super(props, context);
	}
	getVirtulData(year) {
		year = year || '2017';
		let date = +echarts.number.parseDate(year + '-01-01');
		let end = +echarts.number.parseDate((+year + 1) + '-01-01');
		let dayTime = 3600 * 24 * 1000;
		let data = [];
		for (let time = date; time < end; time += dayTime) {
			data.push([
				echarts.format.formatTime('yyyy-MM-dd', time),
				Math.floor(Math.random() * 1000)
			]);
		}
		return data;
	}
	getOption() {
		const option = {
			//devicePixelRatio: 2,
			tooltip: {
				position: 'top'
			},
			visualMap: {
				min: 0,
				max: 1000,
				calculable: true,
				orient: 'horizontal',
				left: 'center',
				top: 'top'
			},

			calendar: [{
				range: '2017',
				cellSize: ['auto', 20]
			}, {
				top: 260,
				range: '2016',
				cellSize: ['auto', 20]
			}],

			series: [{
				type: 'heatmap',
				coordinateSystem: 'calendar',
				calendarIndex: 0,
				data: this.getVirtulData(2017)
			}, {
				type: 'heatmap',
				coordinateSystem: 'calendar',
				calendarIndex: 1,
				data: this.getVirtulData(2016)
			}]
		};
		return option;
	}
	render() {

		return(
			<div>
				<ReactEcharts
					option={this.getOption()} 
					style={{height: '500px', width: '100%'}} 
					lazyUpdate={true}
				/>
			</div>
		);
	}
}

export default App;
