import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import { addUser } from './actions'
import {connect} from 'react-redux'

const NEWACCOUNTURL = 'http://localhost:4000/api/v1/users'

class Register extends React.Component{
  constructor(props){
    super(props)
    this.state={
      username: "Username",
      emailaddress: 'Email Address',
      password: 'Password',
      token: '',
      error: ''
    }
  }

  clear = (event) => {
    if (event.target.id === "username-input"){
      this.setState({
        username: ''
      })
    }
    else if (event.target.id === "email-input"){
      this.setState({
        emailaddress: ''
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
    else if (event.target.id === "email-input"){
      this.setState({
        emailaddress: event.target.value
      })
    }

    else if (event.target.id === "password-input"){
      this.setState({
        password: event.target.value
      })
    }
  }

  createUser = (event) => {
    event.preventDefault()
    fetch(NEWACCOUNTURL, {
      method: 'POST',
      headers: {
        'Accept':'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: {
          username: this.state.username,
          password: this.state.password,
          email: this.state.emailaddress
        }
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
          error: "Username or email is invalid."
        })
      }
    })
  }

  render(){
    return(
      <div className="Registration">
        <div className="Overlay">
          <div className="center-login">
            <h1 id="registration-header">
              Create a New Account
            </h1>
            <form onSubmit={this.createUser} autocomplete="off">
              <input type="text" value={this.state.username} id="username-input" name="username-input" className="registration-input" onClick={this.clear} onChange={this.handleChange} />
              <input type="text" value={this.state.emailaddress} id="email-input" name="email-input" className="registration-input" onClick={this.clear} onChange={this.handleChange} />
              <input type="password" value={this.state.password} id="password-input" name="password-input" className="registration-input" onClick={this.clear} onChange={this.handleChange} />
              <input type="submit" value="Register" id="register-button" />
              {this.state.error !== "" ? <span className="registrationError">{this.state.error}</span> : null}
              <p id="registration-login-text">Already have an account? Sign in <Link to='/login'>here</Link>.</p>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    addUser: (name, email, password) => {
      dispatch(addUser(name, email, password))
    }
  }
}

export default withRouter(connect(null, mapDispatchToProps)(Register))
