import React, { Component } from 'react';
import './App.css';
import StockContainer from './StockContainer'
import NavBar from './Navbar'
import Login from './Login'
import { Route, Redirect, withRouter } from 'react-router-dom'
import Register from './Register'
import {connect} from 'react-redux'
import Adapter from './adapters/Adapter'
import Overview from './Overview'
import Matcher from './Matcher'
import Pattern from './Pattern'
import { addPattern } from './actions'

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

    Adapter.patternFetch("http://localhost:4000/api/v1/patterns")
    .then(res => {
      if(res.message !== "Not Authorized"){
        this.props.addPattern({
        type: "ADD_PATTERN", payload: res.filter(pattern => pattern.user_id === parseInt(localStorage.getItem("id")))})
      }
    })
  }

  render(){
    console.log(this.props)
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
          <Redirect to="/overview" />
        }
        <NavBar props={this.props}/>
      <div className="App">
        {Adapter.loggedIn() ?
          <Redirect to="/register" />
          :
          <Route
            exact path='/'
            component={StockContainer} />
        }
        <Route
          exact path='/overview'
          component={Overview} />
        <Route
          exact path='/pattern-matcher'
          component={Matcher} />
        <Route
          path='/pattern/:patternid'
          component={Pattern} />
      </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    addPattern: (res) => {
      dispatch(addPattern(res))
    }
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App))
