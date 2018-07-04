import React from 'react'
import {Line} from 'react-chartjs'

export default class PatternChart extends React.Component{
  constructor(props){
    super(props)

    this.state={
      chartData: {
        labels: this.props.pattern.map(day => "Day " + this.props.pattern.indexOf(day)),
        datasets: [{
          label: "Performance Data",
          fillColor: "rgba(66, 88, 138)",
          strokeColor: "rgba(220,220,220,0.8)",
          highlightFill: "rgba(90, 0, 0)",
          highlightStroke: "rgba(90, 0, 0)",
          data: this.props.pattern,
        }]
      }
    }
  }
  render(){
    debugger
    return(
      <div className="chart">
      <Line data={this.state.chartData}
        options={{
          title:{
            text: "Performance Data:"
          }
        }}
        width="600"
        height="400" />
      </div>
    )
  }

}
