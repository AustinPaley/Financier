export function addUser(name, email, password){
  return {
    type: 'ADD_USER',
    payload: {name: name, email: email, password: password}
  }
}

export function addPattern(amountInvesting, primarySymbol, open, close, high, low, user_id){
  debugger
  return{
    type: "ADD_PATTERN",
    payload: {}
  }
}
