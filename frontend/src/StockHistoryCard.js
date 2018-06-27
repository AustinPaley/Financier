import React from 'react'

export default class StockHistoryCard extends React.Component{
  constructor(){
    super()

    this.state={
      value: '',
      currentlySelected: false,
      selectedBackground: false,
      showDeleteButton: false
    }
  }

  handleClick = (event) => {
    const currentlySelected = this.state.currentlySelected
    const selectedBackground = this.state.selectedBackground
    const showDeleteButton = this.state.showDeleteButton


    this.setState({
      currentlySelected: !currentlySelected,
      selectedBackground: !selectedBackground,
      showDeleteButton: !showDeleteButton
    })
  }

  render(){
    const deletebutton = this.state.showDeleteButton ? <button onClick={this.props.handleDelete}>Delete</button> : null
    return (
    <div onClick={this.handleClick} style={this.state.selectedBackground === false ? {background: "white"} : {background: "grey"} }>
      <h4>{this.props.stockName} Information</h4>
      <em>Currently Selected? {this.state.currentlySelected === false ? "No" : "Yes"}</em>
      <h5>Open: {this.props.stockInfo["1. open"]}</h5>
      <h5>High: {this.props.stockInfo["2. high"]}</h5>
      <h5>Low: {this.props.stockInfo["3. low"]}</h5>
      <h5>Close: {this.props.stockInfo["4. close"]}</h5>
      <h5>Volume: {this.props.stockInfo["5. volume"]}</h5>
      <div>{deletebutton}</div>
      <br />
    </div>
    )
  }
}
