import CreateAccordion from './CreateAccordion';
import createAccordion from './decorator';
export {
	CreateAccordion,
	createAccordion
};
// 两种用法都可以

// examples_1 此时的 <XXX />为独立组件，要传参数给它
// <CreateAccordion {...options}>
// 	<XXX />
// </CreateAccordion>

// examples_2
// @createAccordion({...options})