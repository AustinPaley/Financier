import React from 'react'
import {Line} from 'react-chartjs'

export default class PatternChart extends React.Component{
  constructor(props){
    super(props)

    this.state={
      chartData: ''
    }
  }
  render(){
    console.log("INSIDE PATTERN CHART", this.props)
    return(
      <div className="chart">
        PATTERNCHART
      </div>
    )
  }

}
