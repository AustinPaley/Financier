const initialState = {
  patterns: []
}

const patternReducer = (state = initialState, action) => {
  switch(action.type){
    case "ADD_PATTERN":
    debugger
      return {...state, patterns: [...state.patterns, action.payload]}
    case "DELETE_PATTERN":
      const UpdatedPatterns = state.patterns[0].patterns.payload.filter(pattern => pattern.id !== action.payload.patterns.payload.id)
    debugger
      return {...state, patterns: [{patterns: {payload: UpdatedPatterns}}]}
    default:
      return state;
  }
}


export default patternReducer
