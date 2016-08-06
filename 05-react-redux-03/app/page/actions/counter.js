import * as types from './actionTypes';

//导出加一的方法
export let incrementAction= () => {
  return {
    type: types.COUNTER_INCREMENT
  };
};
//导出减一的方法
export let decrementAction = () => {
  return {
    type: types.COUNTER_DECREMENT
  };
};