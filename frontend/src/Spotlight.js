import React from 'react'
import Stock from './Stock'
import Form from './Form'
import StockHistoryContainer from './StockHistoryContainer'
import {connect} from 'react-redux'
import Adapter from './adapters/Adapter'

const API = process.env.REACT_APP_ALPHA_VANTAGE_API
const URL1 = "https://www.alphavantage.co/query?function"
const DAILY = `=TIME_SERIES_DAILY`
let SPXSYMBOL = "&symbol=SPX"
const ONEMINUTE = "&interval=1min"
const FINAL = URL1 + DAILY + SPXSYMBOL + ONEMINUTE + API
const FINALSTATUS= "https://api.iextrading.com/1.0/deep/trading-status?symbols="

class Spotlight extends React.Component{
  constructor(props){
    super(props);

    this.state={
      generalInfo: [],
      symbolSearch: '',
      symbolSearchNews: [],
    }
  }

  componentDidMount(){
  }

  changeStock = (event) => {
    this.setState({
      symbolSearch: event.target.value
    })
    Adapter.makeFetch("https://api.iextrading.com/1.0/stock/" + event.target.value + "/news/last/10")
    .then(res => {this.setState({
      symbolSearchNews: res
    })})
  }

  alphavantageFetch = (event) => {
  const SearchedSymbol = "&symbol=" + event.target.children[0].value.toUpperCase()
    fetch(URL1 + DAILY + SearchedSymbol + ONEMINUTE + API)
    .then(response => response.json())
    .then(res => {this.setState({
      generalInfo: res
    })})
  }

// <StockHistoryContainer handleDelete={this.handleDelete} historicalInfo={this.state.generalInfo["Time Series (Daily)"]} handleHistorySearch={this.handleHistorySearch} />

  render(){
    console.log(this.state.symbolSearchNews.length)
    return(
      <div>
        <h2 className="stockSpotlightHeader">Stock Spotlight</h2>
        <input name="stockSearch" onChange={this.changeStock} />
        <h3>Current Stock Name</h3>
        <h4>Placeholder for current stock info table</h4>
        <button>Save This Spotlight</button>
        <h4>News</h4>
        {this.state.symbolSearchNews.length !== undefined ?
          this.state.symbolSearchNews.map(newsItem => {
            return(
              <div>
                <div className="newsItem"><a href={newsItem.url}>{newsItem.headline.toString().substring(0, 100) + "..."}</a></div>
                <div className="recent-news-source">{newsItem.source}</div>
                <div className="recent-news-date">{newsItem.datetime}</div>
              </div>
            )
          })
          :
          <div>No news to display</div>
        }
      </div>
    )
  }
}

export default connect()(Spotlight)
