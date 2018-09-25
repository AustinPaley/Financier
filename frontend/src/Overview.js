import React from 'react'
import {connect} from 'react-redux'
import Slider from 'react-slick'
import Adapter from './adapters/Adapter'
import * as Constants from './constants'
import ReactPlayer from 'react-player'

// const Loading = require('./images/loading-wheel.gif')

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
    Adapter.makeFetch(Constants.SPXCALL)
    .then(res => {
      if(!res.Information && !res["Error Message"]){
        this.setState({
          todaySPX: Adapter.todaysData(res),
          yesterdaySPX: Adapter.yesterdaysData(res)
        })
      }
      else if (!!res.Information && !!res["Error Message"]){
        this.setState({
          todaySPX: 0,
          yesterdaySPX: 0
        })
      }
    })

    Adapter.makeFetch(Constants.DJICALL)
    .then(res => {
      if(!res.Information && !res["Error Message"]){
        this.setState({
        todayDJI: Adapter.todaysData(res),
        yesterdayDJI: Adapter.yesterdaysData(res)
        })
      }

      else if (!!res.Information && !!res["Error Message"]){
        this.setState({
          todayDJI: 0,
          yesterdayDJI: 0
        })
      }
    })

    Adapter.makeFetch(Constants.IXICCALL)
    .then(res => {
      if(!res.Information && !res["Error Message"]){
        this.setState({
        todayIXIC: Adapter.todaysData(res),
        yesterdayIXIC: Adapter.yesterdaysData(res)
        })
      }
      else if (!!res.Information && !!res["Error Message"]){
        this.setState({
          todayIXIC: 0,
          yesterdayIXIC: 0
        })
      }
    })

    Adapter.makeFetch(Constants.RUTCALL)
    .then(res => {
      if(!res.Information && !res["Error Message"]){
        this.setState({
        todayRUT: Adapter.todaysData(res),
        yesterdayRUT: Adapter.yesterdaysData(res)
        })
      }
      else if (!!res.Information && !!res["Error Message"]){
        this.setState({
          todayRUT: 0,
          yesterdayRUT: 0
        })
      }
    })

    Adapter.makeFetch(Constants.DAXCALL)
    .then(res => {
      if(!res.Information && !res["Error Message"]){
        this.setState({
        todayDAX: Adapter.todaysData(res),
        yesterdayDAX: Adapter.yesterdaysData(res)
        })
      }
      else if (!!res.Information && !!res["Error Message"]){
        this.setState({
          todayDAX: 0,
          yesterdayDAX: 0
        })
      }
    })
    Adapter.makeFetch(Constants.VIXCALL)
    .then(res => {
      if(!res.Information && !res["Error Message"]){
        this.setState({
        todayVIX: Adapter.todaysData(res),
        yesterdayVIX: Adapter.yesterdaysData(res)
        })
      }
      else if (!!res.Information && !!res["Error Message"]){
        this.setState({
          todayVIX: 0,
          yesterdayVIX: 0
        })
      }
    })

    setInterval(function(){
    Adapter.makeFetch(Constants.SPXCALL)
    .then(res => {
      if(!res.Information && !res["Error Message"]){
        this.setState({
        todaySPX: Adapter.todaysData(res),
        yesterdaySPX: Adapter.yesterdaysData(res)
        })
      }
      else if (!!res.Information && !!res["Error Message"]){
        this.setState({
          todaySPX: 0,
          yesterdaySPX: 0
        })
      }
    })

    Adapter.makeFetch(Constants.DJICALL)
    .then(res => {
      if(!res.Information && !res["Error Message"]){
        this.setState({
        todayDJI: Adapter.todaysData(res),
        yesterdayDJI: Adapter.yesterdaysData(res)
        })
      }
      else if (!!res.Information && !!res["Error Message"]){
        this.setState({
          todayDJI: 0,
          yesterdayDJI: 0
        })
      }
    })

    Adapter.makeFetch(Constants.IXICCALL)
    .then(res => {
      if(!res.Information && !res["Error Message"]){
        this.setState({
        todayIXIC: Adapter.todaysData(res),
        yesterdayIXIC: Adapter.yesterdaysData(res)
        })
      }
      else if (!!res.Information && !!res["Error Message"]){
        this.setState({
          todayIXIC: 0,
          yesterdayIXIC: 0
        })
      }
    })

    Adapter.makeFetch(Constants.RUTCALL)
    .then(res => {
      if(!res.Information && !res["Error Message"]){
        this.setState({
        todayRUT: Adapter.todaysData(res),
        yesterdayRUT: Adapter.yesterdaysData(res)
        })
      }
      else if (!!res.Information && !!res["Error Message"]){
        this.setState({
          todayRUT: 0,
          yesterdayRUT: 0
        })
      }
    })

    Adapter.makeFetch(Constants.DAXCALL)
    .then(res => {
      if(!res.Information && !res["Error Message"]){
        this.setState({
        todayDAX: Adapter.todaysData(res),
        yesterdayDAX: Adapter.yesterdaysData(res)
        })
      }
      else if (!!res.Information && !!res["Error Message"]){
        this.setState({
          todayDAX: 0,
          yesterdayDAX: 0
        })
      }
    })
    Adapter.makeFetch(Constants.VIXCALL)
    .then(res => {
      if(!res.Information && !res["Error Message"]){
        this.setState({
        todayVIX: Adapter.todaysData(res),
        yesterdayVIX: Adapter.yesterdaysData(res)
        })
      }
      else if (!!res.Information && !!res["Error Message"]){
        this.setState({
          todayVIX: 0,
          yesterdayVIX: 0
        })
      }
    })
  }.bind(this), 60000);

    setInterval(() => {
      Adapter.makeFetch(Constants.NIKKEICALL)
      .then(res => {
        if(!res.Information && !res["Error Message"]){
          this.setState({
          todayNIKKEI: Adapter.todaysData(res),
          yesterdayNIKKEI: Adapter.yesterdaysData(res)
          })
        }
        else if (!!res.Information && !!res["Error Message"]){
          this.setState({
            todayNIKKEI: 0,
            yesterdayNIKKEI: 0
          })
        }
      })

      Adapter.makeFetch(Constants.HSICALL)
      .then(res => {
        if(!res.Information && !res["Error Message"]){
          this.setState({
          todayHSI: Adapter.todaysData(res),
          yesterdayHSI: Adapter.yesterdaysData(res)
          })
        }
        else if (!!res.Information && !!res["Error Message"]){
          this.setState({
            todayHSI: 0,
            yesterdayHSI: 0
          })
        }
      })
    Adapter.makeFetch(Constants.FTSECALL)
    .then(res => {
      if(!res.Information && !res["Error Message"]){
        this.setState({
        todayFTSE: Adapter.todaysData(res),
        yesterdayFTSE: Adapter.yesterdaysData(res)
        })
      }
      else if (!!res.Information && !!res["Error Message"]){
        this.setState({
          todayFTSE: 0,
          yesterdayFTSE: 0
        })
      }
    })

    Adapter.makeFetch(Constants.CAC40CALL)
    .then(res => {
      if(!res.Information && !res["Error Message"]){
        this.setState({
        todayCAC40: Adapter.todaysData(res),
        yesterdayCAC40: Adapter.yesterdaysData(res)
        })
      }
      else if (!!res.Information && !!res["Error Message"]){
        this.setState({
          todayCAC40: 0,
          yesterdayCAC40: 0
        })
      }
    })
  }, 30000);

    Adapter.makeFetch(Constants.WORLDWIDENEWS).then(res => {this.setState({worldwidenews: res})})

    Adapter.makeFetch(Constants.TOPNEWS)
    .then(res => {this.setState({topnews: res.articles.slice(0, 3)})})
  }

  render(){
    console.log(this.state.todaySPX)
    return(
      <div>
        <h2>Todays Markets</h2>
        <Slider {...this.settings}>
          <div className="overviewstock">
            <div>S&P 500 Index</div>
              {(this.state.todaySPX - this.state.yesterdaySPX) > 0 ?
                <img className="arrow" alt="Up Arrow" src={Constants.UpArrow} style={{width: 30, height: 30}} />
              :
                <img className="arrow" alt="Down Arrow" src={Constants.DownArrow} style={{width: 30, height: 30}} />
              }
              <div>{Math.round(1000*(this.state.todaySPX - this.state.yesterdaySPX))/1000}</div>
              <div>{(Math.round(10000*(this.state.todaySPX - this.state.yesterdaySPX)/this.state.yesterdaySPX))*100/10000}%</div>
              <div>{this.state.todaySPX}</div>
          </div>
          <div className="overviewstock">
            <div>Dow</div>
              {(this.state.todayDJI - this.state.yesterdayDJI) > 0 ?
                <img className="arrow" alt="Up Arrow" src={Constants.UpArrow} style={{width: 30, height: 30}} />
              :
                <img className="arrow" alt="Down Arrow" src={Constants.DownArrow} style={{width: 30, height: 30}} />
              }
              <div>{Math.round(1000*(this.state.todayDJI - this.state.yesterdayDJI))/1000}</div>
              <div>{(Math.round(10000*(this.state.todayDJI - this.state.yesterdayDJI)/this.state.yesterdayDJI))*100/10000}%</div>
              <div>{this.state.todayDJI}</div>
          </div>
          <div className="overviewstock">
            <div>Nasdaq Composite</div>
              {(this.state.todayIXIC - this.state.yesterdayIXIC) > 0 ?
                <img className="arrow" alt="Up Arrow" src={Constants.UpArrow} style={{width: 30, height: 30}} />
              :
                <img className="arrow" alt="Down Arrow" src={Constants.DownArrow} style={{width: 30, height: 30}} />
              }
              <div>{Math.round(1000*(this.state.todayIXIC - this.state.yesterdayIXIC))/1000}</div>
              <div>{(Math.round(10000*(this.state.todayIXIC - this.state.yesterdayIXIC)/this.state.yesterdayIXIC))*100/10000}%</div>
              <div>{this.state.todayIXIC}</div>
            </div>
          <div className="overviewstock">
            <div>Russell 2000</div>
              {(this.state.todayRUT - this.state.yesterdayRUT) > 0 ?
                <img className="arrow" alt="Up Arrow" src={Constants.UpArrow} style={{width: 30, height: 30}} />
              :
                <img className="arrow" alt="Down Arrow" src={Constants.DownArrow} style={{width: 30, height: 30}} />
              }
              <div>{Math.round(1000*(this.state.todayRUT - this.state.yesterdayRUT))/1000}</div>
              <div>{(Math.round(10000*(this.state.todayRUT - this.state.yesterdayRUT)/this.state.yesterdayRUT))*100/10000}%</div>
              <div>{this.state.todayRUT}</div>
          </div>
          <div className="overviewstock">
          <div>DAX</div>
            {(this.state.todayDAX - this.state.yesterdayDAX) > 0 ?
              <img className="arrow" alt="Up Arrow" src={Constants.UpArrow} style={{width: 30, height: 30}} />
            :
              <img className="arrow" alt="Down Arrow" src={Constants.DownArrow} style={{width: 30, height: 30}} />
            }
            <div>{Math.round(1000*(this.state.todayDAX - this.state.yesterdayDAX))/1000}</div>
            <div>{(Math.round(10000*(this.state.todayDAX - this.state.yesterdayDAX)/this.state.yesterdayDAX))*100/10000}%</div>
            <div>{this.state.todayDAX}</div>
          </div>
          <div className="overviewstock">
          <div>VIX</div>
            {(this.state.todayVIX - this.state.yesterdayVIX) > 0 ?
              <img className="arrow" alt="Up Arrow" src={Constants.UpArrow} style={{width: 30, height: 30}} />
            :
              <img className="arrow" alt="Down Arrow" src={Constants.DownArrow} style={{width: 30, height: 30}} />
            }
            <div>{Math.round(1000*(this.state.todayVIX - this.state.yesterdayVIX))/1000}</div>
            <div>{(Math.round(10000*(this.state.todayVIX - this.state.yesterdayVIX)/this.state.yesterdayVIX))*100/10000}%</div>
            <div>{this.state.todayVIX}</div>
          </div>
          <div className="overviewstock">
          <div>FTSE 100</div>
            {(this.state.todayFTSE - this.state.yesterdayFTSE) > 0 ?
              <img className="arrow" alt="Up Arrow" src={Constants.UpArrow} style={{width: 30, height: 30}} />
            :
              <img className="arrow" alt="Down Arrow" src={Constants.DownArrow} style={{width: 30, height: 30}} />
            }
            <div>{Math.round(1000*(this.state.todayFTSE - this.state.yesterdayFTSE))/1000}</div>
            <div>{(Math.round(10000*(this.state.todayFTSE - this.state.yesterdayFTSE)/this.state.yesterdayFTSE))*100/10000}%</div>
            <div>{this.state.todayFTSE}</div>
          </div>
          <div className="overviewstock">
          <div>CAC40</div>
            {(this.state.todayCAC40 - this.state.yesterdayCAC40) > 0 ?
              <img className="arrow" alt="Up Arrow" src={Constants.UpArrow} style={{width: 30, height: 30}} />
            :
              <img className="arrow" alt="Down Arrow" src={Constants.DownArrow} style={{width: 30, height: 30}} />
            }
            <div>{Math.round(1000*(this.state.todayCAC40 - this.state.yesterdayCAC40))/1000}</div>
            <div>{(Math.round(10000*(this.state.todayCAC40 - this.state.yesterdayCAC40)/this.state.yesterdayCAC40))*100/10000}%</div>
            <div>{this.state.todayCAC40}</div>
          </div>
          <div className="overviewstock">
          <div>NIKKEI 225</div>
            {(this.state.todayNIKKEI - this.state.yesterdayNIKKEI) > 0 ?
              <img className="arrow" alt="Up Arrow" src={Constants.UpArrow} style={{width: 30, height: 30}} />
            :
              <img className="arrow" alt="Down Arrow" src={Constants.DownArrow} style={{width: 30, height: 30}} />
            }
            <div>{Math.round(1000*(this.state.todayNIKKEI - this.state.yesterdayNIKKEI))/1000}</div>
            <div>{(Math.round(10000*(this.state.todayNIKKEI - this.state.yesterdayNIKKEI)/this.state.yesterdayNIKKEI))*100/10000}%</div>
            <div>{this.state.todayNIKKEI}</div>
          </div>
          <div className="overviewstock">
          <div>Hang Seng Index</div>
            {(this.state.todayHSI - this.state.yesterdayHSI) > 0 ?
              <img className="arrow" alt="Up Arrow" src={Constants.UpArrow} style={{width: 30, height: 30}} />
            :
              <img className="arrow" alt="Down Arrow" src={Constants.DownArrow} style={{width: 30, height: 30}} />
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
                  <div key={index} className="topNews">
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
          <ReactPlayer url="https://www.youtube.com/watch?v=J78SdCzzumA" playing volume="0" className="Video" controls="true" />
          {this.state.worldwidenews !== "" ? this.state.worldwidenews.map((news, index) => {
            return (
            <div key={index.toString() + "news-container"} className="newsLink">
                <a key={index.toString() + "news-url"} href={news.url}>{news.headline.toString().substring(0, 100) + "..."}</a>
                <div key={index.toString() + "news-source"} className="recent-news-source">{news.source}</div>
                <div key={index.toString() + "news-date"} className="recent-news-date">{news.datetime}</div>
            </div>)
          }) : null}
        </div>
      </div>
    )
  }
}

export default connect()(Overview)
