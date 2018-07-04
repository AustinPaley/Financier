import React from 'react'
import { connect } from 'react-redux'
import Adapter from './adapters/Adapter'
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
    if (this.props.pattern !== undefined){
      let symbol = this.props.pattern[0].symbol
      Adapter.makeFetch(URL1 + DAILY + SYMBOLTYPE + symbol + ONEMINUTE + API)
      .then(res => {
        if(res.Information !== "Please consider optimizing your API call frequency." && res["Error Message"] !== "Invalid API call. Please retry or visit the documentation (https://www.alphavantage.co/documentation/) for TIME_SERIES_DAILY."){
          this.setState({
            history: res
          })
        }
      })
    }
  }

  render(){
    const relevantHistory = this.state.history["Time Series (Daily)"]
    debugger
    return(
      <div>
        {this.props.pattern !== undefined ?
          this.props.pattern.map(pattern => {
            return(
              <div className="patternContainer">
                <h2>Results:</h2>
                  {this.state.history && this.props.pattern.length === 1 && Object.entries(relevantHistory).find(entry => entry[1]["4. close"].slice(0, -2) === this.props.pattern[0].close) !== undefined
                  ?
                  <PatternChart pattern={Object.entries(relevantHistory).slice((Object.entries(relevantHistory).map(entry => entry[0]).indexOf(Object.entries(relevantHistory).find(entry => entry[1]["4. close"].slice(0, -2) === this.props.pattern[0].close)[0]) - this.props.pattern[0].days), (Object.entries(relevantHistory).map(entry => entry[0]).indexOf(Object.entries(relevantHistory).find(entry => entry[1]["4. close"].slice(0, -2) === this.props.pattern[0].close)[0]))+1).map(date => parseFloat(date[1]["4. close"].slice(0, -2))).reverse()}/>
                  :
                  null
                  }
                <div className="patternParameters">
                  <h3><u>Search Parameters:</u></h3>
                  <div><b>Symbol:</b> {pattern.symbol}</div>
                  <div><b>Investment Size:</b> {pattern.investment_size}</div>
                  <div><b>Open:</b> {pattern.open}</div>
                  <div><b>High:</b> {pattern.high}</div>
                  <div><b>Low:</b> {pattern.low}</div>
                  <div><b>Close:</b> {pattern.close}</div><br/>
                </div>
              </div>
            )
          })
        :
        null}
        <br />
        {this.state.history && this.props.pattern.length === 1 && Object.entries(relevantHistory).find(entry => entry[1]["4. close"].slice(0, -2) === this.props.pattern[0].close) !== undefined ?
          <div className="patternReturnInfo">
            <h3><u>Query Information</u></h3>
            <div>
            <b>Last Time This Happened:</b> {Object.entries(relevantHistory).find(entry => entry[1]["4. close"].slice(0, -2) === this.props.pattern[0].close)[0]}
            </div>
            <div>
            <b>Initial Close:</b> {Object.entries(relevantHistory).find(entry => entry[1]["4. close"].slice(0, -2) === this.props.pattern[0].close)[1]["4. close"]}
            </div>
            <div><b>Final Close:</b> {Object.entries(relevantHistory)[Object.entries(relevantHistory).map(entry => entry[0]).indexOf(Object.entries(relevantHistory).find(entry => entry[1]["4. close"].slice(0, -2) === this.props.pattern[0].close)[0]) - this.props.pattern[0].days][1]["4. close"]}
            </div>
            <div className="expectedReturn">Based on historical data, you can expect <span className="returnAmount">${Math.trunc(this.props.pattern[0].investment_size * ((Object.entries(relevantHistory)[Object.entries(relevantHistory).map(entry => entry[0]).indexOf(Object.entries(relevantHistory).find(entry => entry[1]["4. close"].slice(0, -2) === this.props.pattern[0].close)[0]) - this.props.pattern[0].days][1]["4. close"]) - (Object.entries(relevantHistory).find(entry => entry[1]["4. close"].slice(0, -2) === this.props.pattern[0].close)[1]["4. close"])))}</span> in return. </div>
          </div>
          :
          <div className="patternReturnInfo">"No Matches Found"</div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  if (state.pattern.patterns[0] !== undefined && state.pattern.patterns[0].patterns.payload.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", ""))) !== null){
    return {
      pattern: state.pattern.patterns[0].patterns.payload.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))
    }
  }
}

export default connect(mapStateToProps)(Pattern)
