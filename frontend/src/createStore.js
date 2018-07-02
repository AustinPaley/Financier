import { renderer } from '.index/js';

export default function createStore(reducer){
  let state;

  function dispatch(action){
    state = reducer(state,action);
    renderer.render()
  }


  function getState(){
    return state;
  }

  function {
    dispatch,
    getState
  }
}
