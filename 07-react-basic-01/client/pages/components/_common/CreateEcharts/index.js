import CreateEcharts from './CreateEcharts';
import createEcharts from './decorator';
export {
	CreateEcharts,
	createEcharts
};
// 两种用法都可以

// examples_1
// <CreateEcharts {...options}>
// 	<XXX />
// </CreateEcharts>

// examples_2
// @createEcharts({...options})