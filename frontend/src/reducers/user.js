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
      };
      return {...state, users: [...state.users, action.payload]}
    default:
      return state;
  }
}


export default userReducer
