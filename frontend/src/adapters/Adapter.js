class Adapter {
  static loggedIn(){
    return !localStorage.getItem("token")
  }

  static logout(){
    return localStorage.clear()
  }

  static makeFetch(fetchurl){
    return fetch(fetchurl)
    .then(response => response.json())
  }
}

export default Adapter
