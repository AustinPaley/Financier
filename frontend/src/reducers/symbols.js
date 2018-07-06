const initialState = {
  symbols: []
}

const symbolsReducer = (state = initialState, action) => {
  switch(action.type){
    case "ADD_SYMBOLS":
      return {...state, symbols: action.payload.symbols}
    default:
      return state;
  }
}


export default symbolsReducer
