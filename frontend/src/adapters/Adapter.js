class Adapter {
  static loggedIn(){
    return !localStorage.getItem("token")
  }

  static logout(){
    return localStorage.clear()
  }

  static makeFetch(fetchurl){
    console.log(fetchurl)
    return fetch(fetchurl)
    .then(response => {
      if(response.ok === true){
        return response.json()
      }
      else {
        return fetch(fetchurl)
      }
    })
  }

  static patternFetch(fetchurl){
    return fetch(fetchurl, {
      headers:{
        'Content-Type' : 'application/json',
        'Authorization' : localStorage.getItem("token")
      }
    })
    .then(response => response.json())
  }

  static deletePattern(fetchurl){
    return fetch(fetchurl, {
      method: 'DELETE',
      headers:{
        'Content-Type' : 'application/json',
        'Authorization' : localStorage.getItem("token")
      }
    })
    .then(response => response.json())
  }

  static postPattern(fetchurl, user_id, symbol, open, close, high, low, investment_size, days){
    return fetch(fetchurl, {
      method: 'POST',
      headers:{
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        pattern: {user_id: user_id,
        symbol: symbol,
        open: open,
        close: close,
        high: high,
        low: low,
        days: days,
        investment_size: investment_size}
      })
    })
    .then(response => response.json())
  }
}

export default Adapter
