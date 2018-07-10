import React from 'react'
import {Line} from 'react-chartjs'
import Adapter from '../adapters/Adapter'
import {connect} from 'react-redux'
const API = process.env.REACT_APP_ALPHA_VANTAGE_API
const URL1 = "https://www.alphavantage.co/query?function"
const DAILY = `=TIME_SERIES_DAILY`
const ONEMINUTE = "&interval=1min"

class MatcherChart extends React.Component{
  constructor(props){
    super(props)

    this.state={
      primarySymbol: this.props.primarySymbol,
      chartData: {
        labels: [],
        datasets: [{
          label: "Performance Data",
          fillColor: "rgba(66, 88, 138, 0.5)",
          strokeColor: "rgba(66, 88, 138)",
          highlightFill: "rgba(90, 0, 0)",
          highlightStroke: "rgba(90, 0, 0)",
          data: [],
        }]
      },
      allData: [],
      selectedDataType: "Closes"
    }
  }

  componentDidMount(){
    let SYMBOL = "&symbol=" + this.props.primarySymbol
    Adapter.makeFetch(URL1 + DAILY + SYMBOL + ONEMINUTE + API)
    .then(res => {
      this.setState({
        chartData:{
          labels: Object.entries(res["Time Series (Daily)"]).map(day => day[0]).reverse(),
          datasets: [{
            label: "Performance Data",
            fillColor: "rgba(66, 88, 138, 0.5)",
            strokeColor: "rgba(66, 88, 138)",
            highlightFill: "rgba(90, 0, 0)",
            highlightStroke: "rgba(90, 0, 0)",
            data: Object.entries(res["Time Series (Daily)"]).map(day => day[1]["4. close"]).reverse()
          }]
        },
        allData: res
      })
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.primarySymbol !== nextProps.primarySymbol) {
      let SYMBOL = "&symbol=" + nextProps.primarySymbol
      Adapter.makeFetch(URL1 + DAILY + SYMBOL + ONEMINUTE + API)
      .then(res => {
        if (!(res.hasOwnProperty('Error Message'))){
          this.setState({
            chartData:{
              labels: Object.entries(res["Time Series (Daily)"]).map(day => day[0]).reverse(),
              datasets: [{
                label: "Performance Data",
                fillColor: "rgba(66, 88, 138, 0.5)",
                strokeColor: "rgba(66, 88, 138)",
                highlightFill: "rgba(90, 0, 0)",
                highlightStroke: "rgba(90, 0, 0)",
                data: Object.entries(res["Time Series (Daily)"]).map(day => day[1]["4. close"]).reverse()
              }]
            },
            allData: res
          })
        }
      })
    }

    else if (this.state.primarySymbol === nextProps.primarySymbol) {
      let SYMBOL = "&symbol=" + this.state.primarySymbol
      Adapter.makeFetch(URL1 + DAILY + SYMBOL + ONEMINUTE + API)
      .then(res => {
        if (!(res.hasOwnProperty('Error Message'))){
          this.setState({
            chartData:{
              labels: Object.entries(res["Time Series (Daily)"]).map(day => day[0]).reverse(),
              datasets: [{
                label: "Performance Data",
                fillColor: "rgba(66, 88, 138, 0.5)",
                strokeColor: "rgba(66, 88, 138)",
                highlightFill: "rgba(90, 0, 0)",
                highlightStroke: "rgba(90, 0, 0)",
                data: Object.entries(res["Time Series (Daily)"]).map(day => day[1]["4. close"]).reverse()
              }]
            },
            allData: res
          })
        }
      })
    }
  }

  handleClick = (event) =>{
    if (event.target.name === "open"){
      this.setState({
        chartData:{
          labels: Object.entries(this.state.allData["Time Series (Daily)"]).map(day => day[0]),
          datasets: [{
            label: "Performance Data",
            fillColor: "rgba(66, 88, 138, 0.5)",
            strokeColor: "rgba(66, 88, 138)",
            highlightFill: "rgba(90, 0, 0)",
            highlightStroke: "rgba(90, 0, 0)",
            data: Object.entries(this.state.allData["Time Series (Daily)"]).map(day => day[1]["1. open"])
          }]
        },
        selectedDataType: "Opens"
      })
    }
    else if (event.target.name === "close"){
      this.setState({
        chartData:{
          labels: Object.entries(this.state.allData["Time Series (Daily)"]).map(day => day[0]),
          datasets: [{
            label: "Performance Data",
            fillColor: "rgba(66, 88, 138, 0.5)",
            strokeColor: "rgba(66, 88, 138)",
            highlightFill: "rgba(90, 0, 0)",
            highlightStroke: "rgba(90, 0, 0)",
            data: Object.entries(this.state.allData["Time Series (Daily)"]).map(day => day[1]["4. close"])
          }]
        },
        selectedDataType: "Closes"
      })
    }
    else if (event.target.name === "high"){
      this.setState({
        chartData:{
          labels: Object.entries(this.state.allData["Time Series (Daily)"]).map(day => day[0]),
          datasets: [{
            label: "Performance Data",
            fillColor: "rgba(66, 88, 138, 0.5)",
            strokeColor: "rgba(66, 88, 138)",
            highlightFill: "rgba(90, 0, 0)",
            highlightStroke: "rgba(90, 0, 0)",
            data: Object.entries(this.state.allData["Time Series (Daily)"]).map(day => day[1]["2. high"])
          }]
        },
        selectedDataType: "Highs"
      })
    }
    else if (event.target.name === "low"){
      this.setState({
        chartData:{
          labels: Object.entries(this.state.allData["Time Series (Daily)"]).map(day => day[0]),
          datasets: [{
            label: "Performance Data",
            fillColor: "rgba(66, 88, 138, 0.5)",
            strokeColor: "rgba(66, 88, 138)",
            highlightFill: "rgba(90, 0, 0)",
            highlightStroke: "rgba(90, 0, 0)",
            data: Object.entries(this.state.allData["Time Series (Daily)"]).map(day => day[1]["3. low"])
          }]
        },
        selectedDataType: "Lows"
      })
    }
  }

  render(){
    return(
      <div className="MatcherChart">
      <h2>{this.props.symbols.find(symbol => symbol.symbol === this.props.primarySymbol.toUpperCase()).name} <em>({this.props.primarySymbol.toUpperCase()})</em> {this.state.selectedDataType}</h2>
        <Line data={this.state.chartData}
          width="1200"
          height="400" />
        <br/>
        <button name="open" onClick={this.handleClick}>Open</button>
        <button name="high" onClick={this.handleClick}>High</button>
        <button name="low" onClick={this.handleClick}>Low</button>
        <button name="close" onClick={this.handleClick}>Close</button>
      </div>
    )
  }

}

const mapStateToProps = state => {
  return {
    symbols: state.symbols.symbols
  }
}

export default connect(mapStateToProps)(MatcherChart)
