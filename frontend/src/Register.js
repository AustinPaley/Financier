import React from 'react'
import { Link } from 'react-router-dom'

export default class Register extends React.Component{
  constructor(props){
    super(props)
    this.state={
      username: "Username",
      emailaddress: 'Email Address',
      password: 'Password'
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


  render(){
    return(
      <div className="Registration">
        <div className="Overlay">
          <div className="center-registration">
            <h1 id="registration-header">
              Create a New Account
            </h1>
            <form>
              <input type="text" value={this.state.username} id="username-input" className="registration-input" onClick={this.clear} onChange={this.handleChange} />
              <input type="text" value={this.state.emailaddress} id="email-input" className="registration-input" onClick={this.clear} onChange={this.handleChange} />
              <input type="text" value={this.state.password} id="password-input" className="registration-input" onClick={this.clear} onChange={this.handleChange} />
              <input type="submit" value="Register" id="register-button" />
              <p id="registration-login-text">Already have an account? Sign in <Link to='/login'>here</Link>.</p>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
