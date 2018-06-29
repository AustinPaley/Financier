import React, { Component } from 'react';
import './App.css';
import StockContainer from './StockContainer'
import NavBar from './Navbar'
import Login from './Login'
import { Route, Redirect, withRouter } from 'react-router-dom'
import Register from './Register'
import {connect} from 'react-redux'
import Adapter from './adapters/Adapter'

const EXISTINGACCOUNTURL = 'http://localhost:4000/api/v1/users'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      users: [],
    }
  }

  componentDidMount(){
    fetch(EXISTINGACCOUNTURL)
    .then(res => res.json())
    .then(json => this.setState({
      users: json
    }))
  }

  render(){
    return (
      <div>
        {Adapter.loggedIn() ?
          <div>
            <Route
              exact path='/register'
              component={Register} />
            <Route
              exact path='/login'
              component={Login} />
          </div>
        :
        <Redirect to="/" />
        }
        <NavBar />
      <div className="App">
        <Route
          exact path='/'
          component={StockContainer} />
      </div>
      </div>
    );
  }
}

export default withRouter(connect()(App))
