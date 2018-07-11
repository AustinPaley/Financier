import React from 'react'
import { connect } from 'react-redux'
import Adapter from './adapters/Adapter'
import JSXAdapter from './adapters/JSXAdapter'
import PatternChart from './components/PatternChart'
const API = process.env.REACT_APP_ALPHA_VANTAGE_API
const URL1 = "https://www.alphavantage.co/query?function"
const DAILY = `=TIME_SERIES_DAILY`
let SYMBOLTYPE = "&symbol="
const ONEMINUTE = "&interval=1min"

class Pattern extends React.Component{
  constructor(props){
    super(props)

    this.state={
      history: '',
    }
  }

  componentDidMount(){
    if (this.props.patterns !== undefined && this.props.patterns.length !== undefined && this.props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0] !== undefined){
      const PATTERN = this.props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0]
      let symbol = PATTERN.symbol
      Adapter.makeFetch(URL1 + DAILY + SYMBOLTYPE + symbol + ONEMINUTE + API)
      .then(res => {
        if(res.Information !== "Please consider optimizing your API call frequency." && res["Error Message"] !== "Invalid API call. Please retry or visit the documentation (https://www.alphavantage.co/documentation/) for TIME_SERIES_DAILY."){
          this.setState({
            history: res
          })
        }
      })
    }
    // if (this.props.patterns !== undefined && this.props.patterns.length === undefined){
    //   let symbol = this.props.pattern.symbol
    //   Adapter.makeFetch(URL1 + DAILY + SYMBOLTYPE + symbol + ONEMINUTE + API)
    //   .then(res => {
    //     if(res.Information !== "Please consider optimizing your API call frequency." && res["Error Message"] !== "Invalid API call. Please retry or visit the documentation (https://www.alphavantage.co/documentation/) for TIME_SERIES_DAILY."){
    //       this.setState({
    //         history: res
    //       })
    //     }
    //   })
    // }
  }

  render(){
    const relevantHistory = this.state.history["Time Series (Daily)"]
    return(
      <div>
        {this.props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0] !== undefined && this.props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].close !== "" ?
              <div className="patternContainer">
                <h2>Results:</h2>
                  {this.state.history && Object.entries(relevantHistory).find(entry => entry[1]["4. close"].slice(0, -2) === this.props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].close
) !== undefined
                  ?
                  <PatternChart pattern={Object.entries(relevantHistory).slice((Object.entries(relevantHistory).map(entry => entry[0]).indexOf(Object.entries(relevantHistory).find(entry => entry[1]["4. close"].slice(0, -2) === this.props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].close)[0]) - this.props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].days), (Object.entries(relevantHistory).map(entry => entry[0]).indexOf(Object.entries(relevantHistory).find(entry => entry[1]["4. close"].slice(0, -2) === this.props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].close)[0]))+1).map(date => parseFloat(date[1]["4. close"].slice(0, -2))).reverse()}/>
                  :
                  null
                  }
                <div className="patternParameters">
                  <h3><u>Search Parameters:</u></h3>
                  <div><b>Symbol:</b> {this.props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].symbol}</div>
                  <div><b>Investment Size:</b> {this.props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].investment_size}</div>
                  <div><b>Open:</b> {this.props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].open}</div>
                  <div><b>High:</b> {this.props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].high}</div>
                  <div><b>Low:</b> {this.props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].low}</div>
                  <div><b>Close:</b> {this.props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].close}</div><br/>
                </div>
              </div>
          :
          null
        }
        <br />
        {this.state.history && this.props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].close !== "" && Object.entries(relevantHistory).find(entry => entry[1]["4. close"].slice(0, -2) === this.props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].close) !== undefined ?
          <div className="patternReturnInfo">
            <h3><u>Query Information</u></h3>
            <div>
            <b>Last Time This Happened:</b> {Object.entries(relevantHistory).find(entry => entry[1]["4. close"].slice(0, -2) === this.props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].close)[0]}
            </div>
            <div>
            <b>Initial Close:</b> {Object.entries(relevantHistory).find(entry => entry[1]["4. close"].slice(0, -2) === this.props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].close)[1]["4. close"]}
            </div>
            <div><b>Final Close:</b> {Object.entries(relevantHistory)[Object.entries(relevantHistory).map(entry => entry[0]).indexOf(Object.entries(relevantHistory).find(entry => entry[1]["4. close"].slice(0, -2) === this.props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].close)[0]) - this.props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].days][1]["4. close"]}
            </div>
            <div className="expectedReturn">Based on historical data, you can expect <span className="returnAmount">${Math.trunc(this.props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].investment_size * ((Object.entries(relevantHistory)[Object.entries(relevantHistory).map(entry => entry[0]).indexOf(Object.entries(relevantHistory).find(entry => entry[1]["4. close"].slice(0, -2) === this.props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].close)[0]) - this.props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].days][1]["4. close"]) - (Object.entries(relevantHistory).find(entry => entry[1]["4. close"].slice(0, -2) === this.props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].close)[1]["4. close"])))}</span> in return. </div>
          </div>
          :
          null
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log("IN PATTERN PROPS", state.pattern.patterns)
  return {
    patterns: state.pattern.patterns
  }
}

export default connect(mapStateToProps)(Pattern)
