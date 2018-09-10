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
