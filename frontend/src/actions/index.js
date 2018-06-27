export function addUser(name, email, password){
  console.log("In Actions", name)
  console.log(email)
  console.log(password)
  return {
    type: 'ADD_USER',
    payload: {name: name, email: email, password: password}
  }
}
