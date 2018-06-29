import React from 'react'
import Stock from './Stock'
import Form from './Form'
import StockHistoryContainer from './StockHistoryContainer'
import {connect} from 'react-redux'
import Slider from 'react-slick'
import Adapter from './adapters/Adapter'

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
let DAXSYMBOL = "&symbol=DAX"
const ONEMINUTE = "&interval=1min"
const SPXCALL = URL1 + DAILY + SPXSYMBOL + ONEMINUTE + API
const DJICALL = URL1 + DAILY + DJISYMBOL + ONEMINUTE + API
const IXICCALL = URL1 + DAILY + IXICSYMBOL + ONEMINUTE + API
const DAXCALL = URL1 + DAILY + DAXSYMBOL + ONEMINUTE + API
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
          </div>
          <div className="overviewstock">
            <h3>STOCK NAME</h3>
            <img src={DownArrow} style={{width: 30, height: 30}} />
            <img src={UpArrow} style={{width: 30, height: 30}} />
            <div>-297.36</div>
            <div>-1.21%</div>
            <div>24,283.53</div>
          </div>
          <div className="overviewstock">
            <h3>STOCK NAME</h3>
            <img src={DownArrow} style={{width: 30, height: 30}} />
            <img src={UpArrow} style={{width: 30, height: 30}} />
            <div>-297.36</div>
            <div>-1.21%</div>
            <div>24,283.53</div>
          </div>
          <div className="overviewstock">
            <h3>STOCK NAME</h3>
            <img src={DownArrow} style={{width: 30, height: 30}} />
            <img src={UpArrow} style={{width: 30, height: 30}} />
            <div>-297.36</div>
            <div>-1.21%</div>
            <div>24,283.53</div>
          </div>
          <div className="overviewstock">
          <h3>STOCK NAME</h3>
            <img src={DownArrow} style={{width: 30, height: 30}} />
            <img src={UpArrow} style={{width: 30, height: 30}} />
            <div>-297.36</div>
            <div>-1.21%</div>
            <div>24,283.53</div>
          </div>
          <div className="overviewstock">
            <h3>STOCK NAME</h3>
            <img src={DownArrow} style={{width: 30, height: 30}} />
            <img src={UpArrow} style={{width: 30, height: 30}} />
            <div>-297.36</div>
            <div>-1.21%</div>
            <div>24,283.53</div>
          </div>
          <div className="overviewstock">
            <h3>STOCK NAME</h3>
            <img src={DownArrow} style={{width: 30, height: 30}} />
            <img src={UpArrow} style={{width: 30, height: 30}} />
            <div>-297.36</div>
            <div>-1.21%</div>
            <div>24,283.53</div>
          </div>
        </Slider>
        <br />
        <div className="topStoryContainer">
          <h2>Top Stories</h2>
          <div className="topNewsContainer">
            {this.state.topnews.length === 3 ?
              this.state.topnews.map((news, index) =>{
                return(
                  <div className="topNews">
                    <img src={news.urlToImage} alt={news.title} style={{width: 400, height: 200}} />
                    <h3><a href={news.url}>{news.title}</a></h3>
                    <div>by {news.author}</div>
                  </div>
                )
              })
              :
              null
            }
          </div>
        </div>
        <h2>Recent News</h2>
        <div className="recent-news-container">
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
