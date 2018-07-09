import React from 'react'
import Stock from './Stock'
import Form from './Form'
import StockHistoryContainer from './StockHistoryContainer'
import SpotlightChart from './components/SpotlightChart'
import {connect} from 'react-redux'
import Adapter from './adapters/Adapter'

const API = process.env.REACT_APP_ALPHA_VANTAGE_API
const URL1 = "https://www.alphavantage.co/query?function"
const DAILY = `=TIME_SERIES_DAILY`
const ONEMINUTE = "&interval=1min"

class Spotlight extends React.Component{
  constructor(props){
    super(props);

    this.state={
      generalInfo: [],
      symbolSearch: '',
      symbolSearchNews: [],
      symbolCompanyInfo: [],
      symbolQuote: []
    }
  }

  changeStock = (event) => {
    this.setState({
      symbolSearch: event.target.value
    })
    Adapter.makeFetch("https://api.iextrading.com/1.0/stock/" + event.target.value + "/news/last/10")
    .then(res => {this.setState({
      symbolSearchNews: res
    })})
    Adapter.makeFetch("https://api.iextrading.com/1.0/stock/" + event.target.value + "/company")
    .then(res => {this.setState({
      symbolCompanyInfo: res
    })})
    Adapter.makeFetch("https://api.iextrading.com/1.0/stock/" + event.target.value + "/quote")
    .then(res => {this.setState({
      symbolQuote: res
    })})
  }

  render(){
    return(
      <div>
        <h2 className="stockSpotlightHeader">Stock Spotlight</h2>
        <input className="stockSearch" onChange={this.changeStock} /><br/>
        <h3 className="stockSpotlightCompanyName">{this.state.symbolCompanyInfo.companyName}</h3><br/><br/><br/><br/><br/>
        <div className="stockInfoContainer">
          <div><b>Symbol</b></div>
          <div>{this.state.symbolQuote.symbol !== undefined ? this.state.symbolQuote.symbol : "-"}</div>
          <div><b>Change</b></div>
          <div>{this.state.symbolQuote.symbol !== undefined ? this.state.symbolQuote.change : "-"}</div>
          <div><b>Bid</b></div>
          <div>{this.state.symbolQuote.symbol !== undefined ? this.state.symbolQuote.iexBidPrice : "-"}</div>
          <div><b>Ask</b></div>
          <div>{this.state.symbolQuote.symbol !== undefined ? this.state.symbolQuote.iexAskPrice : "-"}</div>
          <div><b>Volume</b></div>
          <div>{this.state.symbolQuote.symbol !== undefined ? this.state.symbolQuote.latestVolume : "-"}</div>
          <div><b>TSize</b></div>
          <div>{this.state.symbolQuote.symbol !== undefined ? this.state.symbolQuote.iexRealtimeSize : "-"}</div>
          <div><b>High</b></div>
          <div>{this.state.symbolQuote.symbol !== undefined ? this.state.symbolQuote.high : "-"}</div>
          <div><b>Low</b></div>
          <div>{this.state.symbolQuote.symbol !== undefined ? this.state.symbolQuote.low : "-"}</div>
          <div><b>Close</b></div>
          <div>{this.state.symbolQuote.symbol !== undefined ? this.state.symbolQuote.close : "-"}</div>
        </div>
        <button>Save This Spotlight</button>
        <h4>Chart of Selected Stock Tabular/Graph</h4>
        {this.state.symbolSearch !== ""
          ?
          <SpotlightChart primarySymbol={this.state.symbolSearch}/>
          :
          null
        }
        <h4>{this.state.symbolCompanyInfo.companyName} News</h4>
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
