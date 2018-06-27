import React, { Component } from 'react';
import './App.css';
import StockContainer from './StockContainer'
import NavBar from './Navbar'

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
      <NavBar />
      <div className="App">
        <StockContainer />
      </div>
      </div>
    );
  }
}
