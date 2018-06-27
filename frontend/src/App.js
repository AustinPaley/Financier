import React, { Component } from 'react';
import './App.css';
import StockContainer from './StockContainer'
import NavBar from './Navbar'
import Login from './Login'
import { Route } from 'react-router-dom'
import Register from './Register'

export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      value: '',
    }
  }

  render() {
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
