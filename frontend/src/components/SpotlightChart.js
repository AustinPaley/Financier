import React from 'react'
import {Line} from 'react-chartjs'
import Adapter from '../adapters/Adapter'
import * as Constants from '../constants'

class SpotlightChart extends React.Component{
  constructor(props){
    super(props)

    this.state={
      primarySymbol: this.props.primarySymbol,
      chartData: {
        labels: [],
        options: {
          tooltips: {enabled: false},
          hover: {mode: null},
        },
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
    if(this.props.primarySymbol !== ""){
      let IEXFETCH = Constants.IEXURL + this.props.primarySymbol + "/chart/3m"
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
}

    componentWillReceiveProps(nextProps) {
      if (this.state.primarySymbol !== nextProps.primarySymbol) {
        let SYMBOL = "&symbol=" + nextProps.primarySymbol
        Adapter.makeFetch(Constants.URL1 + Constants.DAILY + SYMBOL + Constants.ONEMINUTE + Constants.API)
        .then(res => {
          if (!(res.hasOwnProperty('Error Message')) && !(res.hasOwnProperty('Information')) && res !== undefined){
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
              allData: res
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
              allData: res
            })
          }
        })
      }
    }

  render(){
    return(
      <div className="SpotlightChart">
        <h2 className="SpotlightChartHeader">Recent Performance</h2>
        <Line data={this.state.chartData}
          options={{pointHitDetectionRadius: 1, pointDotRadius: 4, pointDot: true}}
          width="800"
          height="400" />
      </div>
    )
  }

}

export default SpotlightChart
