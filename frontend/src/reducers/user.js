const initialState = {
  users: []
}

const userReducer = (state = initialState, action) => {
  switch(action.type){
    case "ADD_USER":
      const newUser =
      {
          amountInvesting: action.payload.amountInvesting,
          email: action.payload.email,
          password: action.payload.password,

          // amountInvesting, primarySymbol, open, close, high, low, user_id
      };
      return {...state, users: [...state.users, action.payload]}
    default:
      return state;
  }
  return state;
}


export default userReducer
