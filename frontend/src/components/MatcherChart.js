import React from 'react'
import {Line} from 'react-chartjs'

export default class MatcherChart extends React.Component{
  constructor(props){
    super(props)

    this.state={
      chartData: {}
    }
  }
  render(){
    return(
      <div className="MatcherChart">
        MATCHERCHART GOES HERE
      </div>
    )
  }

}
