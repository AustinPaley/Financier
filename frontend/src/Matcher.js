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
        <div>
          <form>
          <div className="form-amount-investing">Amount Investing: <input type="text" /></div>
          <br />
          <div className="form-primary-symbol">Primary Symbol Name: <input type="text" /></div>
          <br />
          <label>Price:</label>
          <input type="text" />
          <br />
          <label>Volume:</label>
          <input type="text" />
          <br />
          <label>Open Index:</label>
          <input type="text" />
          <br />
          <label>Open Price:</label>
          <input type="text" />
          <br />
          <label>Previous Close:</label>
          <input type="text" />
          <br />
          <label>High:</label>
          <input type="text" />
          <br />
          <label>Low:</label>
          <input type="text" />
          <br />
          <button>Add New Condition</button>
          <br />
          <input type="submit" value="Run" />
          </form>
        </div>
        <div className="saved-patterns">
          <h3>Saved Patterns</h3>
        </div>
      </div>
    )
  }

}
