export function addUser(name, email, password){
  return {
    type: 'ADD_USER',
    payload: {name: name, email: email, password: password}
  }
}

export function addPattern(res){
  return{
    type: "ADD_PATTERN",
    payload: {
      patterns: res
    }
  }
}

export function removePattern(res){
  return{
    type: "DELETE_PATTERN",
    payload: {
      patterns: res
    }
  }
}
