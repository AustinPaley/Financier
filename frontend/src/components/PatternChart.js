import React from 'react'
import {Line} from 'react-chartjs'

export default class PatternChart extends React.Component{
  constructor(props){
    super(props)

    this.state={
      chartData: {
        labels: this.props.pattern,
        datasets: [{
          data: this.props.pattern,
        }]
      }
    }
  }
  render(){
    console.log(this.props.pattern)
    return(
      <div className="chart">
      <Line data={this.state.chartData}
      width="600"
      height="400" />
      </div>
    )
  }

}
