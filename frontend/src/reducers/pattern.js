const initialState = {
  patterns: []
}

const patternReducer = (state = initialState, action) => {
  debugger
  switch(action.type){
    case "ADD_PATTERN":
      return {...state, patterns: [...state.patterns, action.payload]}
    default:
      return state;
  }
}


export default patternReducer
