import React, { Component } from 'react';
import Adapter from './adapters/Adapter'

export default class Matcher extends React.Component{
  constructor(){
    super()
    this.state={
      amountInvesting: '',
      primarySymbol: '',
      open: '',
      close: '',
      high: '',
      low: '',
    }
  }

  handleInput = (event) => {
    if (event.target.name === "amount-investing"){
      this.setState({
        amountInvesting: event.target.value
      })
    }
    else if (event.target.name === "primary-symbol"){
      this.setState({
        primarySymbol: event.target.value
      })
    }

    else if (event.target.name === "open"){
      this.setState({
        open: event.target.value
      })
    }

    else if (event.target.name === "close"){
      this.setState({
        close: event.target.value
      })
    }

    else if (event.target.name === "high"){
      this.setState({
        high: event.target.value
      })
    }

    else if (event.target.name === "low"){
      this.setState({
        low: event.target.value
      })
    }
  }

  handleSubmit = () => {

  }

  render(){
    return(
      <div>
        <div className="pattern-form">
          <form onSubmit={this.handleSubmit}>
            <div className="form-amount-investing">Amount Investing: <input className="input-amount-investing" name="amount-investing" type="text" onChange={this.handleInput} /></div>
            <div className="form-primary-symbol">Primary Symbol Name: <input className="input-primary-symbol" name="primary-symbol" type="text" onChange={this.handleInput} /></div>
            <div className="pattern-selector">Open<input className="pattern-input" name="open" type="text" onChange={this.handleInput} /></div>
            <div className="pattern-selector">Previous Close:<input className="pattern-input" name="close" type="text" onChange={this.handleInput} /></div>
            <div className="pattern-selector">High:<input className="pattern-input" name="high" type="text" onChange={this.handleInput} /></div>
            <div className="pattern-selector">Low:<input className="pattern-input" name="low'" type="text" onChange={this.handleInput} /></div>
            <br /><br />
            <button className="pattern-condition-button">Add New Condition</button>
            <br /><br/>
            <input type="submit" value="Run" className="pattern-button" />
          </form>
        </div>
        <div className="saved-patterns">
          <h3>Saved Patterns</h3>
          <div>Pattern 1</div>
          <div>Pattern 1</div>
          <div>Pattern 1</div>
          <div>Pattern 1</div>
          <div>Pattern 1</div>
          <div>Pattern 1</div>
          <div>Pattern 1</div>
        </div>
      </div>
    )
  }

}
