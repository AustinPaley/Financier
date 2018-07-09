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
    if (this.props.pattern !== undefined && this.props.pattern.length !== undefined){
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
    if (this.props.pattern !== undefined && this.props.pattern.length === undefined){
      let symbol = this.props.pattern.symbol
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
        {this.props.pattern !== undefined && this.props.pattern.length !== undefined ?
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
          null
        }
        {this.props.pattern !== undefined && this.props.pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")) ?
              <div className="patternContainer">
                <h2>Results:</h2>
                  {this.state.history && Object.entries(relevantHistory).find(entry => entry[1]["4. close"].slice(0, -2) === this.props.pattern.close) !== undefined
                  ?
                  <PatternChart pattern={Object.entries(relevantHistory).slice((Object.entries(relevantHistory).map(entry => entry[0]).indexOf(Object.entries(relevantHistory).find(entry => entry[1]["4. close"].slice(0, -2) === this.props.pattern.close)[0]) - this.props.pattern.days), (Object.entries(relevantHistory).map(entry => entry[0]).indexOf(Object.entries(relevantHistory).find(entry => entry[1]["4. close"].slice(0, -2) === this.props.pattern.close)[0]))+1).map(date => parseFloat(date[1]["4. close"].slice(0, -2))).reverse()}/>
                  :
                  null
                  }
                <div className="patternParameters">
                  <h3><u>Search Parameters:</u></h3>
                  <div><b>Symbol:</b> {this.props.pattern.symbol}</div>
                  <div><b>Investment Size:</b> {this.props.pattern.investment_size}</div>
                  <div><b>Open:</b> {this.props.pattern.open}</div>
                  <div><b>High:</b> {this.props.pattern.high}</div>
                  <div><b>Low:</b> {this.props.pattern.low}</div>
                  <div><b>Close:</b> {this.props.pattern.close}</div><br/>
                </div>
              </div>
          :
          null
        }
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
          null
        }
        {this.state.history && this.props.pattern !== undefined && this.props.pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")) ?
          <div className="patternReturnInfo">
            <h3><u>Query Information</u></h3>
            <div>
            <b>Last Time This Happened:</b> {Object.entries(relevantHistory).find(entry => entry[1]["4. close"].slice(0, -2) === this.props.pattern.close)[0]}
            </div>
            <div>
            <b>Initial Close:</b> {Object.entries(relevantHistory).find(entry => entry[1]["4. close"].slice(0, -2) === this.props.pattern.close)[1]["4. close"]}
            </div>
            <div><b>Final Close:</b> {Object.entries(relevantHistory)[Object.entries(relevantHistory).map(entry => entry[0]).indexOf(Object.entries(relevantHistory).find(entry => entry[1]["4. close"].slice(0, -2) === this.props.pattern.close)[0]) - this.props.pattern.days][1]["4. close"]}
            </div>
            <div className="expectedReturn">Based on historical data, you can expect <span className="returnAmount">${Math.trunc(this.props.pattern.investment_size * ((Object.entries(relevantHistory)[Object.entries(relevantHistory).map(entry => entry[0]).indexOf(Object.entries(relevantHistory).find(entry => entry[1]["4. close"].slice(0, -2) === this.props.pattern.close)[0]) - this.props.pattern.days][1]["4. close"]) - (Object.entries(relevantHistory).find(entry => entry[1]["4. close"].slice(0, -2) === this.props.pattern.close)[1]["4. close"])))}</span> in return. </div>
          </div>
          :
          null
        }
        {this.props.pattern !== undefined && this.props.pattern.length !== undefined ?
          this.props.pattern.map(pattern => {
            return(
              <div className="patternContainer">
                <h2>Results:</h2>
                  {this.state.history && this.props.pattern.length === 1 && Object.entries(relevantHistory).find(entry => entry[1]["2. high"].slice(0, -2) === this.props.pattern[0].high) !== undefined
                  ?
                  <PatternChart pattern={Object.entries(relevantHistory).slice((Object.entries(relevantHistory).map(entry => entry[0]).indexOf(Object.entries(relevantHistory).find(entry => entry[1]["2. high"].slice(0, -2) === this.props.pattern[0].high)[0]) - this.props.pattern[0].days), (Object.entries(relevantHistory).map(entry => entry[0]).indexOf(Object.entries(relevantHistory).find(entry => entry[1]["2. high"].slice(0, -2) === this.props.pattern[0].high)[0]))+1).map(date => parseFloat(date[1]["2. high"])).slice(0, -2).reverse()}/>
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
          null
        }
        {this.props.pattern !== undefined && this.props.pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")) ?
              <div className="patternContainer">
                <h2>Results:</h2>
                  {this.state.history && Object.entries(relevantHistory).find(entry => entry[1]["2. high"].slice(0, -2) === this.props.pattern.high) !== undefined
                  ?
                  <PatternChart pattern={Object.entries(relevantHistory).slice((Object.entries(relevantHistory).map(entry => entry[0]).indexOf(Object.entries(relevantHistory).find(entry => entry[1]["2. high"].slice(0, -2) === this.props.pattern.high)[0]) - this.props.pattern.days), (Object.entries(relevantHistory).map(entry => entry[0]).indexOf(Object.entries(relevantHistory).find(entry => entry[1]["2. high"].slice(0, -2) === this.props.pattern.high)[0]))+1).map(date => parseFloat(date[1]["2. high"].slice(0, -2))).reverse()}/>
                  :
                  null
                  }
                <div className="patternParameters">
                  <h3><u>Search Parameters:</u></h3>
                  <div><b>Symbol:</b> {this.props.pattern.symbol}</div>
                  <div><b>Investment Size:</b> {this.props.pattern.investment_size}</div>
                  <div><b>Open:</b> {this.props.pattern.open}</div>
                  <div><b>High:</b> {this.props.pattern.high}</div>
                  <div><b>Low:</b> {this.props.pattern.low}</div>
                  <div><b>Close:</b> {this.props.pattern.close}</div><br/>
                </div>
              </div>
          :
          null
        }
        <br />
        {this.state.history && this.props.pattern.length === 1 && Object.entries(relevantHistory).find(entry => entry[1]["2. high"].slice(0, -2) === this.props.pattern[0].high) !== undefined ?
          <div className="patternReturnInfo">
            <h3><u>Query Information</u></h3>
            <div>
            <b>Last Time This Happened:</b> {Object.entries(relevantHistory).find(entry => entry[1]["2. high"].slice(0, -2) === this.props.pattern[0].high)[0]}
            </div>
            <div>
            <b>Initial Close:</b> {Object.entries(relevantHistory).find(entry => entry[1]["2. high"].slice(0, -2) === this.props.pattern[0].high)[1]["2. high"]}
            </div>
            <div><b>Final Close:</b> {Object.entries(relevantHistory)[Object.entries(relevantHistory).map(entry => entry[0]).indexOf(Object.entries(relevantHistory).find(entry => entry[1]["2. high"].slice(0, -2) === this.props.pattern[0].high)[0]) - this.props.pattern[0].days][1]["2. high"]}
            </div>
            <div className="expectedReturn">Based on historical data, you can expect <span className="returnAmount">${Math.trunc(this.props.pattern[0].investment_size * ((Object.entries(relevantHistory)[Object.entries(relevantHistory).map(entry => entry[0]).indexOf(Object.entries(relevantHistory).find(entry => entry[1]["2. high"].slice(0, -2) === this.props.pattern[0].high)[0]) - this.props.pattern[0].days][1]["2. high"]) - (Object.entries(relevantHistory).find(entry => entry[1]["2. high"].slice(0, -2) === this.props.pattern[0].high)[1]["4. close"])))}</span> in return. </div>
          </div>
          :
          null
        }
        {this.state.history && this.props.pattern !== undefined && this.props.pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")) ?
          <div className="patternReturnInfo">
            <h3><u>Query Information</u></h3>
            <div>
            <b>Last Time This Happened:</b> {Object.entries(relevantHistory).find(entry => entry[1]["2. high"].slice(0, -2) === this.props.pattern.high)[0]}
            </div>
            <div>
            <b>Initial Close:</b> {Object.entries(relevantHistory).find(entry =>
              entry[1]["2. high"].slice(0, -2) === this.props.pattern.high)[1]["2. high"]}
            </div>
            <div><b>Final Close:</b> {Object.entries(relevantHistory)[Object.entries(relevantHistory).map(entry => entry[0]).indexOf(Object.entries(relevantHistory).find(entry => entry[1]["2. high"].slice(0, -2) === this.props.pattern.high)[0]) - this.props.pattern.days][1]["2. high"]}
            </div>
            <div className="expectedReturn">Based on historical data, you can expect <span className="returnAmount">${Math.trunc(this.props.pattern.investment_size * ((Object.entries(relevantHistory)[Object.entries(relevantHistory).map(entry => entry[0]).indexOf(Object.entries(relevantHistory).find(entry => entry[1]["2. high"].slice(0, -2) === this.props.pattern.high)[0]) - this.props.pattern.days][1]["2. high"]) - (Object.entries(relevantHistory).find(entry => entry[1]["2. high"].slice(0, -2) === this.props.pattern.high)[1]["2. high"])))}</span> in return. </div>
          </div>
          :
          null
        }
        {this.props.pattern !== undefined && this.props.pattern.length !== undefined ?
          this.props.pattern.map(pattern => {
            return(
              <div className="patternContainer">
                <h2>Results:</h2>
                  {this.state.history && this.props.pattern.length === 1 && Object.entries(relevantHistory).find(entry => entry[1]["3. low"].slice(0, -2) === this.props.pattern[0].low) !== undefined
                  ?
                  <PatternChart pattern={Object.entries(relevantHistory).slice((Object.entries(relevantHistory).map(entry => entry[0]).indexOf(Object.entries(relevantHistory).find(entry => entry[1]["3. low"].slice(0, -2) === this.props.pattern[0].low)[0]) - this.props.pattern[0].days), (Object.entries(relevantHistory).map(entry => entry[0]).indexOf(Object.entries(relevantHistory).find(entry => entry[1]["3. low"].slice(0, -2) === this.props.pattern[0].low)[0]))+1).map(date => parseFloat(date[1]["3. low"])).slice(0, -2).reverse()}/>
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
          null
        }
        {this.props.pattern !== undefined && this.props.pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")) ?
              <div className="patternContainer">
                <h2>Results:</h2>
                  {this.state.history && Object.entries(relevantHistory).find(entry => entry[1]["3. low"].slice(0, -2) === this.props.pattern.low) !== undefined
                  ?
                  <PatternChart pattern={Object.entries(relevantHistory).slice((Object.entries(relevantHistory).map(entry => entry[0]).indexOf(Object.entries(relevantHistory).find(entry => entry[1]["3. low"].slice(0, -2) === this.props.pattern.low)[0]) - this.props.pattern.days), (Object.entries(relevantHistory).map(entry => entry[0]).indexOf(Object.entries(relevantHistory).find(entry => entry[1]["3. low"].slice(0, -2) === this.props.pattern.low)[0]))+1).map(date => parseFloat(date[1]["3. low"].slice(0, -2))).reverse()}/>
                  :
                  null
                  }
                <div className="patternParameters">
                  <h3><u>Search Parameters:</u></h3>
                  <div><b>Symbol:</b> {this.props.pattern.symbol}</div>
                  <div><b>Investment Size:</b> {this.props.pattern.investment_size}</div>
                  <div><b>Open:</b> {this.props.pattern.open}</div>
                  <div><b>High:</b> {this.props.pattern.high}</div>
                  <div><b>Low:</b> {this.props.pattern.low}</div>
                  <div><b>Close:</b> {this.props.pattern.close}</div><br/>
                </div>
              </div>
          :
          null
        }
        <br />
        {this.state.history && this.props.pattern.length === 1 && Object.entries(relevantHistory).find(entry => entry[1]["3. low"].slice(0, -2) === this.props.pattern[0].low) !== undefined ?
          <div className="patternReturnInfo">
            <h3><u>Query Information</u></h3>
            <div>
            <b>Last Time This Happened:</b> {Object.entries(relevantHistory).find(entry => entry[1]["3. low"].slice(0, -2) === this.props.pattern[0].low)[0]}
            </div>
            <div>
            <b>Initial Close:</b> {Object.entries(relevantHistory).find(entry => entry[1]["3. low"].slice(0, -2) === this.props.pattern[0].low)[1]["3. low"]}
            </div>
            <div><b>Final Close:</b> {Object.entries(relevantHistory)[Object.entries(relevantHistory).map(entry => entry[0]).indexOf(Object.entries(relevantHistory).find(entry => entry[1]["3. low"].slice(0, -2) === this.props.pattern[0].low)[0]) - this.props.pattern[0].days][1]["3. low"]}
            </div>
            <div className="expectedReturn">Based on historical data, you can expect <span className="returnAmount">${Math.trunc(this.props.pattern[0].investment_size * ((Object.entries(relevantHistory)[Object.entries(relevantHistory).map(entry => entry[0]).indexOf(Object.entries(relevantHistory).find(entry => entry[1]["3. low"].slice(0, -2) === this.props.pattern[0].low)[0]) - this.props.pattern[0].days][1]["3. low"]) - (Object.entries(relevantHistory).find(entry => entry[1]["3. low"].slice(0, -2) === this.props.pattern[0].low)[1]["4. close"])))}</span> in return. </div>
          </div>
          :
          null
        }
        {this.state.history && this.props.pattern !== undefined && this.props.pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")) ?
          <div className="patternReturnInfo">
            <h3><u>Query Information</u></h3>
            <div>
            <b>Last Time This Happened:</b> {Object.entries(relevantHistory).find(entry => entry[1]["3. low"].slice(0, -2) === this.props.pattern.low)[0]}
            </div>
            <div>
            <b>Initial Close:</b> {Object.entries(relevantHistory).find(entry =>
              entry[1]["3. low"].slice(0, -2) === this.props.pattern.low)[1]["3. low"]}
            </div>
            <div><b>Final Close:</b> {Object.entries(relevantHistory)[Object.entries(relevantHistory).map(entry => entry[0]).indexOf(Object.entries(relevantHistory).find(entry => entry[1]["3. low"].slice(0, -2) === this.props.pattern.low)[0]) - this.props.pattern.days][1]["3. low"]}
            </div>
            <div className="expectedReturn">Based on historical data, you can expect <span className="returnAmount">${Math.trunc(this.props.pattern.investment_size * ((Object.entries(relevantHistory)[Object.entries(relevantHistory).map(entry => entry[0]).indexOf(Object.entries(relevantHistory).find(entry => entry[1]["3. low"].slice(0, -2) === this.props.pattern.low)[0]) - this.props.pattern.days][1]["3. low"]) - (Object.entries(relevantHistory).find(entry => entry[1]["3. low"].slice(0, -2) === this.props.pattern.low)[1]["3. low"])))}</span> in return. </div>
          </div>
          :
          null
        }
        {this.props.pattern !== undefined && this.props.pattern.length !== undefined ?
          this.props.pattern.map(pattern => {
            return(
              <div className="patternContainer">
                <h2>Results:</h2>
                  {this.state.history && this.props.pattern.length === 1 && Object.entries(relevantHistory).find(entry => entry[1]["1. open"].slice(0, -2) === this.props.pattern[0].open) !== undefined
                  ?
                  <PatternChart pattern={Object.entries(relevantHistory).slice((Object.entries(relevantHistory).map(entry => entry[0]).indexOf(Object.entries(relevantHistory).find(entry => entry[1]["1. open"].slice(0, -2) === this.props.pattern[0].open)[0]) - this.props.pattern[0].days), (Object.entries(relevantHistory).map(entry => entry[0]).indexOf(Object.entries(relevantHistory).find(entry => entry[1]["1. open"].slice(0, -2) === this.props.pattern[0].open)[0]))+1).map(date => parseFloat(date[1]["1. open"])).slice(0, -2).reverse()}/>
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
          null
        }
        {this.props.pattern !== undefined && this.props.pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")) ?
              <div className="patternContainer">
                <h2>Results:</h2>
                  {this.state.history && Object.entries(relevantHistory).find(entry => entry[1]["1. open"].slice(0, -2) === this.props.pattern.open) !== undefined
                  ?
                  <PatternChart pattern={Object.entries(relevantHistory).slice((Object.entries(relevantHistory).map(entry => entry[0]).indexOf(Object.entries(relevantHistory).find(entry => entry[1]["1. open"].slice(0, -2) === this.props.pattern.open)[0]) - this.props.pattern.days), (Object.entries(relevantHistory).map(entry => entry[0]).indexOf(Object.entries(relevantHistory).find(entry => entry[1]["1. open"].slice(0, -2) === this.props.pattern.open)[0]))+1).map(date => parseFloat(date[1]["1. open"].slice(0, -2))).reverse()}/>
                  :
                  null
                  }
                <div className="patternParameters">
                  <h3><u>Search Parameters:</u></h3>
                  <div><b>Symbol:</b> {this.props.pattern.symbol}</div>
                  <div><b>Investment Size:</b> {this.props.pattern.investment_size}</div>
                  <div><b>Open:</b> {this.props.pattern.open}</div>
                  <div><b>High:</b> {this.props.pattern.high}</div>
                  <div><b>Low:</b> {this.props.pattern.low}</div>
                  <div><b>Close:</b> {this.props.pattern.close}</div><br/>
                </div>
              </div>
          :
          null
        }
        {this.state.history && this.props.pattern.length === 1 && Object.entries(relevantHistory).find(entry => entry[1]["1. open"].slice(0, -2) === this.props.pattern[0].open) !== undefined ?
          <div className="patternReturnInfo">
            <h3><u>Query Information</u></h3>
            <div>
            <b>Last Time This Happened:</b> {Object.entries(relevantHistory).find(entry => entry[1]["1. open"].slice(0, -2) === this.props.pattern[0].open)[0]}
            </div>
            <div>
            <b>Initial Close:</b> {Object.entries(relevantHistory).find(entry => entry[1]["1. open"].slice(0, -2) === this.props.pattern[0].open)[1]["1. open"]}
            </div>
            <div><b>Final Close:</b> {Object.entries(relevantHistory)[Object.entries(relevantHistory).map(entry => entry[0]).indexOf(Object.entries(relevantHistory).find(entry => entry[1]["1. open"].slice(0, -2) === this.props.pattern[0].open)[0]) - this.props.pattern[0].days][1]["1. open"]}
            </div>
            <div className="expectedReturn">Based on historical data, you can expect <span className="returnAmount">${Math.trunc(this.props.pattern[0].investment_size * ((Object.entries(relevantHistory)[Object.entries(relevantHistory).map(entry => entry[0]).indexOf(Object.entries(relevantHistory).find(entry => entry[1]["1. open"].slice(0, -2) === this.props.pattern[0].open)[0]) - this.props.pattern[0].days][1]["1. open"]) - (Object.entries(relevantHistory).find(entry => entry[1]["1. open"].slice(0, -2) === this.props.pattern[0].open)[1]["4. close"])))}</span> in return. </div>
          </div>
          :
          null
        }
        {this.state.history && this.props.pattern !== undefined && this.props.pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")) ?
          <div className="patternReturnInfo">
            <h3><u>Query Information</u></h3>
            <div>
            <b>Last Time This Happened:</b> {Object.entries(relevantHistory).find(entry => entry[1]["1. open"].slice(0, -2) === this.props.pattern.open)[0]}
            </div>
            <div>
            <b>Initial Close:</b> {Object.entries(relevantHistory).find(entry =>
              entry[1]["1. open"].slice(0, -2) === this.props.pattern.open)[1]["1. open"]}
            </div>
            <div><b>Final Close:</b> {Object.entries(relevantHistory)[Object.entries(relevantHistory).map(entry => entry[0]).indexOf(Object.entries(relevantHistory).find(entry => entry[1]["1. open"].slice(0, -2) === this.props.pattern.open)[0]) - this.props.pattern.days][1]["1. open"]}
            </div>
            <div className="expectedReturn">Based on historical data, you can expect <span className="returnAmount">${Math.trunc(this.props.pattern.investment_size * ((Object.entries(relevantHistory)[Object.entries(relevantHistory).map(entry => entry[0]).indexOf(Object.entries(relevantHistory).find(entry => entry[1]["1. open"].slice(0, -2) === this.props.pattern.open)[0]) - this.props.pattern.days][1]["1. open"]) - (Object.entries(relevantHistory).find(entry => entry[1]["1. open"].slice(0, -2) === this.props.pattern.open)[1]["1. open"])))}</span> in return. </div>
          </div>
          :
          null
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  if (state.pattern.patterns[0] !== undefined && state.pattern.patterns[0].patterns.payload.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", ""))) !== null && (state.pattern.patterns[1] === undefined || state.pattern.patterns[1].patterns.id !== parseInt(window.location.pathname.replace("/pattern/", "")))){
    return {
      pattern: state.pattern.patterns[0].patterns.payload.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))
    }
  }
  else if(state.pattern.patterns[1] !== undefined && state.pattern.patterns[1].patterns.id === parseInt(window.location.pathname.replace("/pattern/", "")) !== null){
    return{
      pattern: state.pattern.patterns[1].patterns
    }
  }
}

export default connect(mapStateToProps)(Pattern)
