import React, { Component } from 'react';
import './App.css';
import Spotlight from './Spotlight'
import NavBar from './Navbar'
import Login from './Login'
import { Route, Redirect, withRouter } from 'react-router-dom'
import Register from './Register'
import {connect} from 'react-redux'
import Adapter from './adapters/Adapter'
import Overview from './Overview'
import Matcher from './Matcher'
import Pattern from './Pattern'
import QuoteWindow from './QuoteWindow'
import TradeNow from './TradeNow'
import { addPattern, addSymbols } from './actions'
import * as Constants from './adapters/Constants'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      users: [],
    }
  }

  componentDidMount(){
    fetch(Constants.EXISTINGACCOUNTURL)
    .then(res => res.json())
    .then(json => this.setState({
      users: json
    }))

    Adapter.patternFetch("http://localhost:4000/api/v1/patterns")
    .then(res => {
      if(res.message !== "Not Authorized"){
        this.props.addPattern(res)
      }
    })

    Adapter.makeFetch("https://api.iextrading.com/1.0/ref-data/symbols")
    .then(res =>
      this.props.addSymbols(res)
    )
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
          <Redirect to="/overview" />
        }
        <NavBar props={this.props}/>
      <div className="App">
        {Adapter.loggedIn() ?
          <Redirect to="/register" />
          :
          <Route
            exact path='/stock-spotlight'
            component={Spotlight} />
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
        <Route
          exact path='/quote-window'
          component={QuoteWindow} />
          <Route
            exact path='/trade'
            component={TradeNow} />
      </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    addPattern: (res) => {
      dispatch(addPattern(res))
    },
    addSymbols: (res) => {
      dispatch(addSymbols(res))
    }
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App))
