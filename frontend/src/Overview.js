import React from 'react'
import Stock from './Stock'
import Form from './Form'
import StockHistoryContainer from './StockHistoryContainer'
import {connect} from 'react-redux'
import Slider from 'react-slick'
const DownArrow = require('./images/down-arrow.png')
const UpArrow = require('./images/up-arrow.png')

const API = process.env.REACT_APP_ALPHA_VANTAGE_API
const URL1 = "https://www.alphavantage.co/query?function"
const DAILY = `=TIME_SERIES_DAILY`
let SPXSYMBOL = "&symbol=SPX"
const ONEMINUTE = "&interval=1min"
const FINAL = URL1 + DAILY + SPXSYMBOL + ONEMINUTE + API
const FINALSTATUS= "https://api.iextrading.com/1.0/deep/trading-status?symbols="

class Overview extends React.Component{
  constructor(props){
    super(props);

    this.state={
      value: ''
    }

    this.settings={
      swipe: true,
      arrows: true,
      infinite: true,
      speed: 500,
      slidesToShow: 6,
      slidesToScroll: 1
    }
  }

  componentDidMount(){
    fetch(FINAL)
    .then(response => response.json())
    .then(res => {this.setState({
      generalInfo: res
    })})
  }

  render(){
    return(
      <div>
        <h2>Todays Markets</h2>
        <Slider {...this.settings}>
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
        <h2>Top Stories</h2>
        <div>Story 1</div>
        <div>Story 2</div>
        <div>Story 3</div>
        <h2>Worldwide News</h2>
        <div>VIDEO</div>
        <div>NEWS ITEMS</div>
      </div>
    )
  }
}

export default connect()(Overview)
