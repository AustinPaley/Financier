class Adapter {
  static loggedIn(){
    return !localStorage.getItem("token")
  }

  // static logout(){
  //   return {
  //     localStorage.removeItem("id")
  //     localStorage.removeItem("token")
  //   }
  // }
}

export default Adapter
