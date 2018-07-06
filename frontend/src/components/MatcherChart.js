import React from 'react'
import {Line} from 'react-chartjs'
import Adapter from '../adapters/Adapter'
const API = process.env.REACT_APP_ALPHA_VANTAGE_API
const URL1 = "https://www.alphavantage.co/query?function"
const DAILY = `=TIME_SERIES_DAILY`
let SPXSYMBOL = "&symbol=SPX"
const ONEMINUTE = "&interval=1min"
const SPXCALL = URL1 + DAILY + SPXSYMBOL + ONEMINUTE + API

export default class MatcherChart extends React.Component{
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
      }
    }
  }

  componentDidMount(){
    let SYMBOL = "&symbol=" + this.props.primarySymbol
    Adapter.makeFetch(URL1 + DAILY + SYMBOL + ONEMINUTE + API)
    .then(res => {
      this.setState({
        chartData:{
          labels: Object.entries(res["Time Series (Daily)"]).map(day => day[0]),
          datasets: [{
            label: "Performance Data",
            fillColor: "rgba(66, 88, 138, 0.5)",
            strokeColor: "rgba(66, 88, 138)",
            highlightFill: "rgba(90, 0, 0)",
            highlightStroke: "rgba(90, 0, 0)",
            data: Object.entries(res["Time Series (Daily)"]).map(day => day[1]["4. close"])
          }]
        }
      })
    })
  }

  render(){
    return(
      <div className="MatcherChart">
      <h2>{this.props.primarySymbol} Data</h2>
        <Line data={this.state.chartData}
          width="1200"
          height="400" />
      </div>
    )
  }

}
