import React from 'react'

export default class HistoryFilter extends React.Component{
  constructor(props){
    super(props)

    this.state={
      value: ''
    }
  }

  render(){
    return (
    <div>
      <form>
      <label>Filter By Date (year-month-date): </label>
      <input type="text" onChange={this.props.handleHistorySearch} />
      <button type="submit">Search</button>
      </form>
    </div>
    )
  }
}


//HOW TO GET THE KEYS WE NEED

// Object.keys(this.props.historicalInfo)

///HOW TO GET TODAY'S DATE TO COMPARE TO HISTORICAL INFORMATION

// let todaysdate = new Date();
//
// todaysdate.getFullYear() + "-" + ("0" + (todaysdate.getMonth() + 1)) + "-" + todaysdate.getDate();
