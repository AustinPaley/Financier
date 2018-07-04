import React from 'react'
import {Line} from 'react-chartjs'

export default class PatternChart extends React.Component{
  constructor(props){
    super(props)

    this.state={
      chartData: {
        datasets: [{
          data: this.props.pattern,
        }]
      }
    }
  }
  render(){
    debugger
    return(
      <div className="chart">
      </div>
    )
  }

}
