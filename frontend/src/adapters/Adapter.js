class Adapter {
  static loggedIn(){
    return !localStorage.getItem("token")
  }
  
  static logout(){
    return localStorage.clear()
  }
}

export default Adapter
