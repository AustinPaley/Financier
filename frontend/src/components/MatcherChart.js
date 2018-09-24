import React from 'react'
import {Line} from 'react-chartjs'
import Adapter from '../adapters/Adapter'
import {connect} from 'react-redux'
import * as Constants from '../constants'

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
      selectedDataType: "Closes",
      unavailable: false
    }
  }

  componentDidMount(){
    let IEXFETCH = Constants.URL2 + this.props.primarySymbol + "/chart/3m"
    Adapter.makeFetch(IEXFETCH)
      .then(res => {
        if(res["status"] !== 404){
          this.setState({
            chartData:{
              labels: [],
              datasets: [{
                label: "Performance Data",
                fillColor: "rgba(66, 88, 138, 0.5)",
                strokeColor: "rgba(66, 88, 138)",
                highlightFill: "rgba(90, 0, 0)",
                highlightStroke: "rgba(90, 0, 0)",
                data: res.map(day => day["close"]),
              }]
            },
            allData: res
          })
        }
      })
}

  componentWillReceiveProps(nextProps) {
    if (this.state.primarySymbol !== nextProps.primarySymbol) {
      let SYMBOL = "&symbol=" + nextProps.primarySymbol
      Adapter.makeFetch(Constants.URL1 + Constants.DAILY + SYMBOL + Constants.ONEMINUTE + Constants.API)
      .then(res => {
        if (!(res.hasOwnProperty('Error Message')) && !(res.hasOwnProperty('Information'))){
          this.setState({
            chartData:{
              labels: [],
              datasets: [{
                label: "Performance Data",
                fillColor: "rgba(66, 88, 138, 0.5)",
                strokeColor: "rgba(66, 88, 138)",
                highlightFill: "rgba(90, 0, 0)",
                highlightStroke: "rgba(90, 0, 0)",
                data: Object.entries(res["Time Series (Daily)"]).map(day => day[1]["4. close"]).reverse()
              }]
            },
            allData: res,
            unavailable: false,
          })
        }
      })
    }

    else if (this.state.primarySymbol === nextProps.primarySymbol) {
      let SYMBOL = "&symbol=" + this.state.primarySymbol
      Adapter.makeFetch(Constants.URL1 + Constants.DAILY + SYMBOL + Constants.ONEMINUTE + Constants.API)
      .then(res => {
        if (!(res.hasOwnProperty('Error Message')) && !(res.hasOwnProperty('Information'))){
          this.setState({
            chartData:{
              labels: [],
              datasets: [{
                label: "Performance Data",
                fillColor: "rgba(66, 88, 138, 0.5)",
                strokeColor: "rgba(66, 88, 138)",
                highlightFill: "rgba(90, 0, 0)",
                highlightStroke: "rgba(90, 0, 0)",
                data: Object.entries(res["Time Series (Daily)"]).map(day => day[1]["4. close"]).reverse()
              }]
            },
            allData: res,
            unavailable: false
          })
        }
      })
    }
    else {
      this.setState({
        unavailable: true
      })
    }
  }

  handleClick = (event) =>{
    if (event.target.name === "open"){
      this.setState({
        chartData:{
          labels: [],
          datasets: [{
            label: "Performance Data",
            fillColor: "rgba(66, 88, 138, 0.5)",
            strokeColor: "rgba(66, 88, 138)",
            highlightFill: "rgba(90, 0, 0)",
            highlightStroke: "rgba(90, 0, 0)",
            data: this.state.allData.map(day => day[event.target.name])
          }]
        },
        selectedDataType: "Opens"
      })
    }
    else if (event.target.name === "close"){
      this.setState({
        chartData:{
          labels: [],
          datasets: [{
            label: "Performance Data",
            fillColor: "rgba(66, 88, 138, 0.5)",
            strokeColor: "rgba(66, 88, 138)",
            highlightFill: "rgba(90, 0, 0)",
            highlightStroke: "rgba(90, 0, 0)",
            data: this.state.allData.map(day => day[event.target.name])
          }]
        },
        selectedDataType: "Closes"
      })
    }
    else if (event.target.name === "high"){
      this.setState({
        chartData:{
          labels: [],
          datasets: [{
            label: "Performance Data",
            fillColor: "rgba(66, 88, 138, 0.5)",
            strokeColor: "rgba(66, 88, 138)",
            highlightFill: "rgba(90, 0, 0)",
            highlightStroke: "rgba(90, 0, 0)",
            data: this.state.allData.map(day => day[event.target.name])
          }]
        },
        selectedDataType: "Highs"
      })
    }
    else if (event.target.name === "low"){
      this.setState({
        chartData:{
          labels: [],
          datasets: [{
            label: "Performance Data",
            fillColor: "rgba(66, 88, 138, 0.5)",
            strokeColor: "rgba(66, 88, 138)",
            highlightFill: "rgba(90, 0, 0)",
            highlightStroke: "rgba(90, 0, 0)",
            data: this.state.allData.map(day => day[event.target.name])
          }]
        },
        selectedDataType: "Lows"
      })
    }
  }

  render(){
    return(
      <div className="MatcherChart">
      <h2>{this.props.symbols.find(symbol => symbol.symbol === this.props.primarySymbol.toUpperCase()) !== undefined ? this.props.symbols.find(symbol => symbol.symbol === this.props.primarySymbol.toUpperCase()).name : "INFORMATION NOT AVAILABLE"} <em>({this.props.primarySymbol.toUpperCase()})</em> {this.state.selectedDataType}</h2>
        <Line data={this.state.chartData}
          options={{pointHitDetectionRadius: 1}}
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
