const initialState = {
  patterns: []
}

const patternReducer = (state = initialState, action) => {
  switch(action.type){
    case "ADD_PATTERN":
      return {...state, patterns: action.payload}
    case "DELETE_PATTERN":
      const UpdatedPatterns = state.patterns.filter(pattern => pattern.id !== action.payload.id)
      return {...state, patterns: UpdatedPatterns}
    case "CREATE_PATTERN":
      return {...state, patterns: [...state.patterns, action.payload]}
    default:
      return state;
  }
}


export default patternReducer
