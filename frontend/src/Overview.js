import React from 'react'
import Stock from './Stock'
import Form from './Form'
import StockHistoryContainer from './StockHistoryContainer'
import {connect} from 'react-redux'
import Slider from 'react-slick'
import Adapter from './adapters/Adapter'
import ReactPlayer from 'react-player'

const DownArrow = require('./images/down-arrow.png')
const UpArrow = require('./images/up-arrow.png')
const Loading = require('./images/loading-wheel.gif')

const API = process.env.REACT_APP_ALPHA_VANTAGE_API
const URL1 = "https://www.alphavantage.co/query?function"
const URL2 = "https://newsapi.org/v2/top-headlines?sources=the-wall-street-journal&apiKey="
const DAILY = `=TIME_SERIES_DAILY`
let SPXSYMBOL = "&symbol=SPX"
let DJISYMBOL = "&symbol=DJI"
let IXICSYMBOL = "&symbol=IXIC"
let DAXSYMBOL = "&symbol=^GDAXI"
let RUTSYMBOL = "&symbol=^RUT"
let FTSESYMBOL = "&symbol=^FTSE"
let VIXSYMBOL = "&symbol=^VIX"
let CAC40SYMBOL = "&symbol=^FCHI"
let NIKKEISYMBOL = "&symbol=^N225"
let HSISYMBOL = "&symbol=^HSI"
const ONEMINUTE = "&interval=1min"
const SPXCALL = URL1 + DAILY + SPXSYMBOL + ONEMINUTE + API
const DJICALL = URL1 + DAILY + DJISYMBOL + ONEMINUTE + API
const IXICCALL = URL1 + DAILY + IXICSYMBOL + ONEMINUTE + API
const DAXCALL = URL1 + DAILY + DAXSYMBOL + ONEMINUTE + API
const RUTCALL = URL1 + DAILY + RUTSYMBOL + ONEMINUTE + API
const FTSECALL = URL1 + DAILY + FTSESYMBOL + ONEMINUTE + API
const VIXCALL = URL1 + DAILY + VIXSYMBOL + ONEMINUTE + API
const CAC40CALL = URL1 + DAILY + CAC40SYMBOL + ONEMINUTE + API
const NIKKEICALL = URL1 + DAILY + NIKKEISYMBOL + ONEMINUTE + API
const HSICALL = URL1 + DAILY + HSISYMBOL + ONEMINUTE + API
const FINALSTATUS= "https://api.iextrading.com/1.0/deep/trading-status?symbols="
const WORLDWIDENEWS = "https://api.iextrading.com/1.0/stock/market/news/last/9"
const NEWSAPI = process.env.REACT_APP_NEWS_API
const TOPNEWS = URL2 + NEWSAPI


class Overview extends React.Component{
  constructor(props){
    super(props);

    this.state={
      worldwidenews: '',
      topnews: ''
    }

    this.settings={
      swipe: true,
      arrows: true,
      infinite: true,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 6
    }
  }

  componentDidMount(){
    Adapter.makeFetch(SPXCALL)
    .then(res => {this.setState({
      todaySPX: Object.entries(res["Time Series (Daily)"])[0][1]["4. close"],
      yesterdaySPX: Object.entries(res["Time Series (Daily)"])[1][1]["4. close"]
    })
    })

    Adapter.makeFetch(DJICALL)
    .then(res => {
      this.setState({
      todayDJI: Object.entries(res["Time Series (Daily)"])[0][1]["4. close"],
      yesterdayDJI: Object.entries(res["Time Series (Daily)"])[1][1]["4. close"]
    })
    })

    Adapter.makeFetch(IXICCALL)
    .then(res => {
      this.setState({
      todayIXIC: Object.entries(res["Time Series (Daily)"])[0][1]["4. close"],
      yesterdayIXIC: Object.entries(res["Time Series (Daily)"])[1][1]["4. close"]
    })
    })

    Adapter.makeFetch(RUTCALL)
    .then(res => {
      this.setState({
      todayRUT: Object.entries(res["Time Series (Daily)"])[0][1]["4. close"],
      yesterdayRUT: Object.entries(res["Time Series (Daily)"])[1][1]["4. close"]
    })
    })

    Adapter.makeFetch(DAXCALL)
    .then(res => {
      this.setState({
      todayDAX: Object.entries(res["Time Series (Daily)"])[0][1]["4. close"],
      yesterdayDAX: Object.entries(res["Time Series (Daily)"])[1][1]["4. close"]
    })
    })

    Adapter.makeFetch(FTSECALL)
    .then(res => {
      this.setState({
      todayFTSE: Object.entries(res["Time Series (Daily)"])[0][1]["4. close"],
      yesterdayFTSE: Object.entries(res["Time Series (Daily)"])[1][1]["4. close"]
    })
    })

    Adapter.makeFetch(VIXCALL)
    .then(res => {
      this.setState({
      todayVIX: Object.entries(res["Time Series (Daily)"])[0][1]["4. close"],
      yesterdayVIX: Object.entries(res["Time Series (Daily)"])[1][1]["4. close"]
    })
    })

    Adapter.makeFetch(CAC40CALL)
    .then(res => {
      this.setState({
      todayCAC40: Object.entries(res["Time Series (Daily)"])[0][1]["4. close"],
      yesterdayCAC40: Object.entries(res["Time Series (Daily)"])[1][1]["4. close"]
    })
    })

    Adapter.makeFetch(NIKKEICALL)
    .then(res => {
      this.setState({
      todayNIKKEI: Object.entries(res["Time Series (Daily)"])[0][1]["4. close"],
      yesterdayNIKKEI: Object.entries(res["Time Series (Daily)"])[1][1]["4. close"]
    })
    })

    Adapter.makeFetch(HSICALL)
    .then(res => {
      this.setState({
      todayHSI: Object.entries(res["Time Series (Daily)"])[0][1]["4. close"],
      yesterdayHSI: Object.entries(res["Time Series (Daily)"])[1][1]["4. close"]
    })
    })

    Adapter.makeFetch(WORLDWIDENEWS).then(res => {this.setState({worldwidenews: res})})

    Adapter.makeFetch(TOPNEWS)
    .then(res => {this.setState({topnews: res.articles.slice(0, 3)})})
  }

  render(){
    console.log(this.state)
    return(
      <div>
        <h2>Todays Markets</h2>
        <Slider {...this.settings}>
          <div className="overviewstock">
            <div>S&P 500 Index</div>
              {(this.state.todaySPX - this.state.yesterdaySPX) > 0 ?
                <img className="arrow" src={UpArrow} style={{width: 30, height: 30}} />
              :
                <img className="arrow" src={DownArrow} style={{width: 30, height: 30}} />
              }
              <div>{Math.round(1000*(this.state.todaySPX - this.state.yesterdaySPX))/1000}</div>
              <div>{(Math.round(10000*(this.state.todaySPX - this.state.yesterdaySPX)/this.state.yesterdaySPX))*100/10000}%</div>
              <div>{this.state.todaySPX}</div>
          </div>
          <div className="overviewstock">
            <div>Dow</div>
              {(this.state.todayDJI - this.state.yesterdayDJI) > 0 ?
                <img className="arrow" src={UpArrow} style={{width: 30, height: 30}} />
              :
                <img className="arrow" src={DownArrow} style={{width: 30, height: 30}} />
              }
              <div>{Math.round(1000*(this.state.todayDJI - this.state.yesterdayDJI))/1000}</div>
              <div>{(Math.round(10000*(this.state.todayDJI - this.state.yesterdayDJI)/this.state.yesterdayDJI))*100/10000}%</div>
              <div>{this.state.todayDJI}</div>
          </div>
          <div className="overviewstock">
            <div>Nasdaq Composite</div>
              {(this.state.todayIXIC - this.state.yesterdayIXIC) > 0 ?
                <img className="arrow" src={UpArrow} style={{width: 30, height: 30}} />
              :
                <img className="arrow" src={DownArrow} style={{width: 30, height: 30}} />
              }
              <div>{Math.round(1000*(this.state.todayIXIC - this.state.yesterdayIXIC))/1000}</div>
              <div>{(Math.round(10000*(this.state.todayIXIC - this.state.yesterdayIXIC)/this.state.yesterdayIXIC))*100/10000}%</div>
              <div>{this.state.todayIXIC}</div>
            </div>
          <div className="overviewstock">
            <div>Russell 2000</div>
              {(this.state.todayRUT - this.state.yesterdayRUT) > 0 ?
                <img className="arrow" src={UpArrow} style={{width: 30, height: 30}} />
              :
                <img className="arrow" src={DownArrow} style={{width: 30, height: 30}} />
              }
              <div>{Math.round(1000*(this.state.todayRUT - this.state.yesterdayRUT))/1000}</div>
              <div>{(Math.round(10000*(this.state.todayRUT - this.state.yesterdayRUT)/this.state.yesterdayRUT))*100/10000}%</div>
              <div>{this.state.todayRUT}</div>
          </div>
          <div className="overviewstock">
          <div>DAX</div>
            {(this.state.todayDAX - this.state.yesterdayDAX) > 0 ?
              <img className="arrow" src={UpArrow} style={{width: 30, height: 30}} />
            :
              <img className="arrow" src={DownArrow} style={{width: 30, height: 30}} />
            }
            <div>{Math.round(1000*(this.state.todayDAX - this.state.yesterdayDAX))/1000}</div>
            <div>{(Math.round(10000*(this.state.todayDAX - this.state.yesterdayDAX)/this.state.yesterdayDAX))*100/10000}%</div>
            <div>{this.state.todayDAX}</div>
          </div>
          <div className="overviewstock">
          <div>VIX</div>
            {(this.state.todayVIX - this.state.yesterdayVIX) > 0 ?
              <img className="arrow" src={UpArrow} style={{width: 30, height: 30}} />
            :
              <img className="arrow" src={DownArrow} style={{width: 30, height: 30}} />
            }
            <div>{Math.round(1000*(this.state.todayVIX - this.state.yesterdayVIX))/1000}</div>
            <div>{(Math.round(10000*(this.state.todayVIX - this.state.yesterdayVIX)/this.state.yesterdayVIX))*100/10000}%</div>
            <div>{this.state.todayVIX}</div>
          </div>
          <div className="overviewstock">
          <div>FTSE 100</div>
            {(this.state.todayFTSE - this.state.yesterdayFTSE) > 0 ?
              <img className="arrow" src={UpArrow} style={{width: 30, height: 30}} />
            :
              <img className="arrow" src={DownArrow} style={{width: 30, height: 30}} />
            }
            <div>{Math.round(1000*(this.state.todayFTSE - this.state.yesterdayFTSE))/1000}</div>
            <div>{(Math.round(10000*(this.state.todayFTSE - this.state.yesterdayFTSE)/this.state.yesterdayFTSE))*100/10000}%</div>
            <div>{this.state.todayFTSE}</div>
          </div>
          <div className="overviewstock">
          <div>CAC40</div>
            {(this.state.todayCAC40 - this.state.yesterdayCAC40) > 0 ?
              <img className="arrow" src={UpArrow} style={{width: 30, height: 30}} />
            :
              <img className="arrow" src={DownArrow} style={{width: 30, height: 30}} />
            }
            <div>{Math.round(1000*(this.state.todayCAC40 - this.state.yesterdayCAC40))/1000}</div>
            <div>{(Math.round(10000*(this.state.todayCAC40 - this.state.yesterdayCAC40)/this.state.yesterdayCAC40))*100/10000}%</div>
            <div>{this.state.todayCAC40}</div>
          </div>
          <div className="overviewstock">
          <div>NIKKEI 225</div>
            {(this.state.todayNIKKEI - this.state.yesterdayNIKKEI) > 0 ?
              <img className="arrow" src={UpArrow} style={{width: 30, height: 30}} />
            :
              <img className="arrow" src={DownArrow} style={{width: 30, height: 30}} />
            }
            <div>{Math.round(1000*(this.state.todayNIKKEI - this.state.yesterdayNIKKEI))/1000}</div>
            <div>{(Math.round(10000*(this.state.todayNIKKEI - this.state.yesterdayNIKKEI)/this.state.yesterdayNIKKEI))*100/10000}%</div>
            <div>{this.state.todayNIKKEI}</div>
          </div>
          <div className="overviewstock">
          <div>Hang Seng Index</div>
            {(this.state.todayHSI - this.state.yesterdayHSI) > 0 ?
              <img className="arrow" src={UpArrow} style={{width: 30, height: 30}} />
            :
              <img className="arrow" src={DownArrow} style={{width: 30, height: 30}} />
            }
            <div>{Math.round(1000*(this.state.todayHSI - this.state.yesterdayHSI))/1000}</div>
            <div>{(Math.round(10000*(this.state.todayHSI - this.state.yesterdayHSI)/this.state.yesterdayHSI))*100/10000}%</div>
            <div>{this.state.todayHSI}</div>
          </div>
        </Slider>
        <br />
        <div className="topStoryContainer">
          <tr><h2>Top Stories</h2></tr>
          <div className="topNewsContainer">
            {this.state.topnews.length === 3 ?
              this.state.topnews.map((news, index) =>{
                return(
                  <div className="topNews">
                    <img src={news.urlToImage} alt={news.title} style={{width: 400, height: 200}} />
                    <h3><a href={news.url}>{news.title.toString().substring(0, 55) + "..."}</a></h3>
                    <div>by {news.author}</div>
                  </div>
                )
              })
              :
              null
            }
          </div>
        </div>
        <br /><br/>
        <h2>Recent News</h2>
        <div className="recent-news-container">
          <ReactPlayer url="https://www.youtube.com/watch?v=Ga3maNZ0x0w" playing volume="0" className="Video" controls="true" />
          {this.state.worldwidenews !== "" ? this.state.worldwidenews.map((news, index) => {
            return (
            <div className="newsLink">
                <a href={news.url}>{news.headline.toString().substring(0, 100) + "..."}</a>
                <div className="recent-news-source">{news.source}</div>
                <div className="recent-news-date">{news.datetime}</div>
            </div>)
          }) : null}
        </div>
      </div>
    )
  }
}

export default connect()(Overview)
