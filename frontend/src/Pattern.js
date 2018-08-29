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
          JSXAdapter.closeInformationOne(this.state, relevantHistory, this.props, PatternChart)
          :
          null
        }
        {this.state.history && this.props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].close !== "" && Object.entries(relevantHistory).find(entry => entry[1]["4. close"].slice(0, -2) === this.props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].close) !== undefined ?
          JSXAdapter.closeInformationTwo(relevantHistory, this.props)
          :
          null
        }
        {this.props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0] !== undefined && this.props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].open !== "" ?
          JSXAdapter.openInformationOne(this.state, relevantHistory, this.props, PatternChart)
          :
          null
        }
        {this.state.history && this.props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].open !== "" && Object.entries(relevantHistory).find(entry => entry[1]["1. open"].slice(0, -2) === this.props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].open) !== undefined ?
          JSXAdapter.openInformationTwo(relevantHistory, this.props)
          :
          null
        }
        {this.props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0] !== undefined && this.props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].high !== "" ?
          JSXAdapter.highInformationOne(this.state, relevantHistory, this.props, PatternChart)
          :
          null
        }
        {this.state.history && this.props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].high !== "" && Object.entries(relevantHistory).find(entry => entry[1]["2. high"].slice(0, -2) === this.props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].high) !== undefined ?
          JSXAdapter.highInformationTwo(relevantHistory, this.props)
          :
          null
        }
        {this.props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0] !== undefined && this.props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].low !== "" ?
          JSXAdapter.lowInformationOne(this.state, relevantHistory, this.props, PatternChart)
          :
          null
        }
        {this.state.history && this.props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].low !== "" && Object.entries(relevantHistory).find(entry => entry[1]["3. low"].slice(0, -2) === this.props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].low) !== undefined ?
          JSXAdapter.lowInformationTwo(relevantHistory, this.props)
          :
          null
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    patterns: state.pattern.patterns
  }
}

export default connect(mapStateToProps)(Pattern)
