import * as types from './actionTypes';

export let increaseAction = (num = 1)=>{
  return {
    type:types.TEST_INCREASE,
    num
  };
};

export let themeAction = ()=>{
  return {
    type:types.TEST_THEME,
  };
};