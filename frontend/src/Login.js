import React from 'react'
// import { Link } from 'react-router-dom'

export default class Login extends React.Component{
  constructor(props){
    super(props)
    this.state={
      username: "Username",
      password: 'Password',
      error: ''
    }
  }

  clear = (event) => {
    if (event.target.id === "username-input"){
      this.setState({
        username: ''
      })
    }

    else if (event.target.id === "password-input"){
      this.setState({
        password: ''
      })
    }
  }

  handleChange = (event) => {
    if (event.target.id === "username-input"){
      this.setState({
        username: event.target.value
      })
    }

    else if (event.target.id === "password-input"){
      this.setState({
        password: event.target.value
      })
    }
  }

  loginUser = (event) => {
    event.preventDefault()
    fetch("http://localhost:4000/api/v1/sessions/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      })
    })
    .then(res => res.json())
    .then(res => {
      if (!res.errors){
        localStorage.setItem('token', res.token)
        localStorage.setItem('id', res.id)
        this.props.history.push("/")
      }
      else if (!!res.errors){
        this.setState({
          error: res.errors
        })
      }
    })
  }

  render(){
    console.log(this.state.error)
    return(
      <div className="Registration">
        <div className="Overlay">
          <div className="center-registration">
            <h1 id="login-header">
              Sign in to Financier
            </h1>
            <form onSubmit={this.loginUser}>
              <input type="text" value={this.state.username} id="username-input" name="username-input" className="login-input" onClick={this.clear} onChange={this.handleChange} />
              <input type="text" value={this.state.password} id="password-input" name="password-input" className="login-input" onClick={this.clear} onChange={this.handleChange} />
              <input type="submit" value="Sign In" id="login-button" />
              {this.state.error !== "" ? <span className="loginError">{this.state.error}</span> : null}
            </form>
          </div>
        </div>
      </div>
    )
  }
}
