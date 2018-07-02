import React, { Component } from 'react';

export default class Matcher extends React.Component{
  constructor(){
    super()
    this.state={
      value: ''
    }
  }

  render(){
    return(
      <div>
        <div className="pattern-form">
          <form>
          <div className="form-amount-investing">Amount Investing: <input className="input-amount-investing" type="text" /></div>
          <div className="form-primary-symbol">Primary Symbol Name: <input className="input-primary-symbol" type="text" /></div>
          <div className="pattern-selector">Price:<input className="pattern-input" type="text" /></div>
          <div className="pattern-selector">Volume:<input className="pattern-input" type="text" /></div>
          <div className="pattern-selector">Open Index:<input className="pattern-input" type="text" /></div>
          <div className="pattern-selector">Open Price:<input className="pattern-input" type="text" /></div>
          <div className="pattern-selector">Previous Close:<input className="pattern-input" type="text" /></div>
          <div className="pattern-selector">High:<input className="pattern-input" type="text" /></div>
          <div className="pattern-selector">Low:<input className="pattern-input" type="text" /></div>
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
