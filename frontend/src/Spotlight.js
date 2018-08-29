import React from 'react'
import SpotlightChart from './components/SpotlightChart'
import {connect} from 'react-redux'
import Adapter from './adapters/Adapter'
const LoadingWheel = require('./images/loading-wheel.gif')

let Yes = null
let IntervalCall = null

class Spotlight extends React.Component{
  constructor(props){
    super(props);

    this.state={
      generalInfo: [],
      symbolSearch: '',
      symbolSearchNews: [],
      symbolCompanyInfo: [],
      symbolQuote: [],
      user_id: localStorage.getItem("id"),
      saved_patterns: [],
      loading: false,
    }
  }

  componentDidMount(){
    Adapter.spotlightFetch("http://localhost:4000/api/v1/spotlights")
    .then(res => {
      if(res.message !== "Not Authorized"){
        this.setState({
          saved_patterns: res
        })
      }
    })
  }

  saveSpotlight = () => {
    Adapter.spotlightSave("http://localhost:4000/api/v1/spotlights", this.state.symbolQuote.symbol, this.state.user_id)
    .then(res => {
      if(res.message !== "Not Authorized"){
        this.setState({
          saved_patterns: res
        })
        alert("Symbol " + res[res.length - 1].symbol + " has been added to your saved symbols.")
      }
    })
  }

  deleteSpotlight = (event) => {
    const ToBeDeleted = event.target.parentNode.children[2].value
    if (ToBeDeleted !== "Your Saved Symbols..."){
      Adapter.spotlightDelete("http://localhost:4000/api/v1/spotlights")
      .then(res => {
        debugger
        this.setState({
          saved_patterns: res
        })
      })
    }
  }

  changeStock = (event) => {
    const SymbolSearched = event.target.value
    this.setState({
      loading: true
    })
    clearTimeout(Yes)
    Yes = setTimeout(() => {
      this.setState({
        symbolSearch: SymbolSearched,
        loading: false,
      })
    }, 5000)


    clearInterval(IntervalCall)
    IntervalCall = setInterval(() => {
      Adapter.makeFetch("https://api.iextrading.com/1.0/stock/" + SymbolSearched + "/quote")
      .then(res => {this.setState({
        symbolQuote: res
      })})
      Adapter.makeFetch("https://api.iextrading.com/1.0/stock/" + SymbolSearched + "/news/last/10")
      .then(res => {this.setState({
        symbolSearchNews: res,
        loading: false
      })})
      Adapter.makeFetch("https://api.iextrading.com/1.0/stock/" + SymbolSearched + "/company")
      .then(res => {this.setState({
        symbolCompanyInfo: res
      })})
    }, 2500)
  }

  render(){
    return(
      <div>
        <h2 className="stockSpotlightHeader">Stock Spotlight</h2>
        <input className="stockSearch" onChange={this.changeStock} />
        <select className="savedPatterns" onChange={this.changeStock}>
          <option default selected disabled>Your Saved Symbols...</option>
          {this.state.saved_patterns.map(pattern => {
            return(
            <option>{pattern.symbol}</option>
            )
          })}
        </select>
        <br/>
        {this.state.symbolCompanyInfo.symbol !== undefined ? <h3 className="stockSpotlightCompanyName">{this.state.symbolCompanyInfo.companyName} ({this.state.symbolCompanyInfo.symbol})</h3> : <h3 className="stockSpotlightCompanyName">Search a Stock Symbol To Begin</h3>}<br/><br/><br/><br/><br/>
        <div className="stockTicker">
          <div className="stockInfoContainer">
            <div className="stockInfoHeader"><b>Symbol</b></div>
            <div className="stockInfoHeader"><b>Change</b></div>
            <div className="stockInfoHeader"><b>Bid</b></div>
            <div className="stockInfoHeader"><b>Ask</b></div>
            <div className="stockInfoHeader"><b>Volume</b></div>
            <div className="stockInfoHeader"><b>TSize</b></div>
            <div className="stockInfoHeader"><b>High</b></div>
            <div className="stockInfoHeader"><b>Low</b></div>
            <div className="stockInfoHeader"><b>Close</b></div>
            <div className="stockInfoData">{this.state.symbolQuote.symbol !== undefined && this.state.symbolQuote.length === undefined ? this.state.symbolQuote.symbol : "-"}</div>
            <div className="stockInfoData">{this.state.symbolQuote.symbol !== undefined && this.state.symbolQuote.length === undefined ? this.state.symbolQuote.change : "-"}</div>
            <div className="stockInfoData">{this.state.symbolQuote.symbol !== undefined && this.state.symbolQuote.length === undefined ? this.state.symbolQuote.iexBidPrice : "-"}</div>
            <div className="stockInfoData">{this.state.symbolQuote.symbol !== undefined && this.state.symbolQuote.length === undefined ? this.state.symbolQuote.iexAskPrice : "-"}</div>
            <div className="stockInfoData">{this.state.symbolQuote.symbol !== undefined && this.state.symbolQuote.length === undefined ? this.state.symbolQuote.latestVolume : "-"}</div>
            <div className="stockInfoData">{this.state.symbolQuote.symbol !== undefined && this.state.symbolQuote.length === undefined ? this.state.symbolQuote.iexRealtimeSize : "-"}</div>
            <div className="stockInfoData">{this.state.symbolQuote.symbol !== undefined && this.state.symbolQuote.length === undefined ? this.state.symbolQuote.high : "-"}</div>
            <div className="stockInfoData">{this.state.symbolQuote.symbol !== undefined && this.state.symbolQuote.length === undefined ? this.state.symbolQuote.low : "-"}</div>
            <div className="stockInfoData">{this.state.symbolQuote.symbol !== undefined && this.state.symbolQuote.length === undefined ? this.state.symbolQuote.close : "-"}</div>
          </div>
          <button className="saveSpotlight" onClick={this.saveSpotlight}>Save Spotlight</button>
        </div>
        {this.state.symbolSearch !== ""
          ?
          <SpotlightChart primarySymbol={this.state.symbolSearch}/>
          :
          this.state.loading === true ?
            <img className="SpotlightLoadWheel" src={LoadingWheel} />
          :
            null
        }
        <div className="spotlightNewsContainer">
          {this.state.symbolSearchNews.length !== 0 && this.state.symbolSearchNews.length !== undefined ? <h4>{this.state.symbolCompanyInfo.companyName} News</h4> : null}
          {this.state.symbolSearchNews.length !== 0 && this.state.symbolSearchNews.length !== undefined ?
            this.state.symbolSearchNews.slice(0, 6).map(newsItem => {
              return(
                <div>
                  <div className="newsItem"><a href={newsItem.url}>{newsItem.headline.toString().substring(0, 40) + "..."}</a></div>
                  <div className="recent-news-source">{newsItem.source}</div>
                  <div className="recent-news-date">{newsItem.datetime}</div>
                  <br/>
                </div>
              )
            })
            :
            null
          }
        </div>
      </div>
    )
  }
}

export default connect()(Spotlight)
