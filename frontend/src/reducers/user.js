const initialState = {
  users: []
}

const userReducer = (state = initialState, action) => {
  switch(action.type){
    case "ADD_USER":
      const newUser =
      {
          name: action.payload.name,
          email: action.payload.email,
          password: action.payload.password,
          token: action.payload.token
      };
      return {...state, users: [...state.users, action.payload]}
    default:
      return state;
  }
  return state;
}


export default userReducer
