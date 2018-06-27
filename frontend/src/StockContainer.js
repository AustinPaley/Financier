import React from 'react'
import Stock from './Stock'
import Form from './Form'
import StockHistoryContainer from './StockHistoryContainer'

const API = process.env.REACT_APP_ALPHA_VANTAGE_API
const URL1 = "https://www.alphavantage.co/query?function"
const DAILY = `=TIME_SERIES_DAILY`
let SPXSYMBOL = "&symbol=SPX"
const ONEMINUTE = "&interval=1min"
const FINAL = URL1 + DAILY + SPXSYMBOL + ONEMINUTE + API
const FINALSTATUS= "https://api.iextrading.com/1.0/deep/trading-status?symbols="

export default class StockContainer extends React.Component{
  constructor(props){
    super(props);

    this.state={
      generalInfo: [],
      symbolSearch: '',
      symbolStatus: '',
    }
  }

  componentDidMount(){
    fetch(FINAL)
    .then(response => response.json())
    .then(res => {this.setState({
      generalInfo: res
    })})
  }

  changeStock = (event) => {
    event.preventDefault()
    this.alphavantageFetch(event)
    // this.iextradingFetch(event)
  }

  alphavantageFetch = (event) => {
  const SearchedSymbol = "&symbol=" + event.target.children[0].value.toUpperCase()
    fetch(URL1 + DAILY + SearchedSymbol + ONEMINUTE + API)
    .then(response => response.json())
    .then(res => {this.setState({
      generalInfo: res
    })})
  }

  iextradingFetch = (event) => {
    const StatusSymbol = event.target.children[0].value.toUpperCase()
    fetch(FINALSTATUS + StatusSymbol)
    .then(response => response.json())
    .then(res => {this.setState({
      symbolStatus: Object.values(res)[0].status
    })})
  }

  handleDelete = (event) => {
    event.stopPropagation()
    const toBeDeleted = event.target.parentNode.parentNode.children[0].innerHTML.split(" ")[0]
    this.deleteItem(toBeDeleted)
  }

  deleteItem = (toBeDeleted) => {
    const NewGeneralInfo = {...this.state.generalInfo}
    delete NewGeneralInfo["Time Series (Daily)"][toBeDeleted]
    this.setState({
      generalInfo: NewGeneralInfo
    })
  }

  render(){
    return(
      <div>
      <Stock generalInfo={this.state.generalInfo} stockStatus={this.state.symbolStatus}/>
      <Form changeStock={this.changeStock} />
      <StockHistoryContainer handleDelete={this.handleDelete} historicalInfo={this.state.generalInfo["Time Series (Daily)"]} handleHistorySearch={this.handleHistorySearch} />
      </div>
    )
  }
}
