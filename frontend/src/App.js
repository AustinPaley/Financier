import React, { Component } from 'react';
import './App.css';
import StockContainer from './StockContainer'
import NavBar from './Navbar'
import Login from './Login'
import { Route, Redirect } from 'react-router-dom'
import Register from './Register'
import {connect} from 'react-redux'

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
      <Route
        path='/register'
        component={Register} />
      <Route
        path='/login'
        component={Login} />
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

export default connect()(App)
