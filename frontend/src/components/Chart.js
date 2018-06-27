import React from 'react'
import {Line} from 'react-chartjs'

export default class Chart extends React.Component{
  constructor(props){
    super(props)

    this.state={
      chartData: {
        labels: this.props.date,
        datasets: [{
          data: Object.entries(this.props.historicalInfo.historicalInfo).map(date => {return(date[1]["4. close"])}),
        }]
      }
    }
  }

  render(){
    return(
      <div className="chart">
        <Line data={this.state.chartData}
        width="600"
        height="400"
        options={{
          title:{
            display: true,
            text:'Largest Cities In',
            fontSize:25
          },
          maintainAspectRatio: false,
          xAxes: [{gridLines: {display: false}}]
        }} />
      </div>
    )
  }
}
