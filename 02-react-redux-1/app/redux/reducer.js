/*eslint no-console:0*/
let reducer = (state={count:0},action)=>{
    let count = state.count;
    switch(action.type){
        case 'increase':
        	console.log('increase trigger');
            return {count:count+1};
            break;
        default:
            return state;
    }
};
export default reducer;