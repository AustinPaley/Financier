import React from 'react'
import SpotlightChart from './components/SpotlightChart'
import {connect} from 'react-redux'
import Adapter from './adapters/Adapter'

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
    console.log("SYMBOL", this.state.symbolCompanyInfo.symbol !== undefined)
    return(
      <div>
        <h2 className="stockSpotlightHeader">Stock Spotlight</h2>
        <input className="stockSearch" onChange={this.changeStock} /><br/>
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
            <div className="stockInfoData">{this.state.symbolQuote.symbol !== undefined ? this.state.symbolQuote.symbol : "-"}</div>
            <div className="stockInfoData">{this.state.symbolQuote.symbol !== undefined ? this.state.symbolQuote.change : "-"}</div>
            <div className="stockInfoData">{this.state.symbolQuote.symbol !== undefined ? this.state.symbolQuote.iexBidPrice : "-"}</div>
            <div className="stockInfoData">{this.state.symbolQuote.symbol !== undefined ? this.state.symbolQuote.iexAskPrice : "-"}</div>
            <div className="stockInfoData">{this.state.symbolQuote.symbol !== undefined ? this.state.symbolQuote.latestVolume : "-"}</div>
            <div className="stockInfoData">{this.state.symbolQuote.symbol !== undefined ? this.state.symbolQuote.iexRealtimeSize : "-"}</div>
            <div className="stockInfoData">{this.state.symbolQuote.symbol !== undefined ? this.state.symbolQuote.high : "-"}</div>
            <div className="stockInfoData">{this.state.symbolQuote.symbol !== undefined ? this.state.symbolQuote.low : "-"}</div>
            <div className="stockInfoData">{this.state.symbolQuote.symbol !== undefined ? this.state.symbolQuote.close : "-"}</div>
          </div>
          <button className="saveSpotlight">Save Spotlight</button>
        </div>
        {this.state.symbolSearch !== ""
          ?
          <SpotlightChart primarySymbol={this.state.symbolSearch}/>
          :
          null
        }
        <div className="spotlightNewsContainer">
          {this.state.symbolSearchNews.length !== 0 && this.state.symbolSearchNews.length !== undefined ? <h4>{this.state.symbolCompanyInfo.companyName} News</h4> : null}
          {this.state.symbolSearchNews.length !== 0 && this.state.symbolSearchNews.length !== undefined ?
            this.state.symbolSearchNews.map(newsItem => {
              return(
                <div>
                  <div className="newsItem"><a href={newsItem.url}>{newsItem.headline.toString().substring(0, 50) + "..."}</a></div>
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
