export function addUser(name, email, password, token){
  return {
    type: 'ADD_USER',
    payload: {name: name, email: email, password: password, token: token}
  }
}
