import React from 'react'
import StockHistoryCard from './StockHistoryCard'
import HistoryFilter from './HistoryFilter'
import Chart from './components/Chart'


export default class StockHistoryContainer extends React.Component{
  constructor(props){
    super(props)

    this.state={
      dayArray: this.props,
      daySearch: ''
    }
  }

  handleHistorySearch = (event) => {
    this.setState({
      daySearch: event.target.value
    })
  }

  handleDelete = (event) => {
    event.stopPropagation()
    this.props.handleDelete(event)
  }

  render(){
    const chartDate= this.props.historicalInfo === undefined ? "fail" : Object.entries(this.props.historicalInfo).map(date => {return(date[0])})
    return (
    <div>
    <br />
    <h2>Historical Info:</h2>
    {this.props.historicalInfo === undefined ?

      <div>Loading...</div> :
      <Chart historicalInfo={this.props} date={chartDate}/>
    }

    <br />
    <h3>Historical Day Info:</h3>
    <HistoryFilter handleHistorySearch={this.handleHistorySearch}/>
      {this.props.historicalInfo === undefined ?
        <div>Loading...</div> :

        Object.entries(this.props.historicalInfo).map((object, index) => {
          return(
            <StockHistoryCard handleDelete={this.handleDelete} stockInfo={object[1]} key={index} stockName={object[0]}/>
          )
        })
      }
    </div>
    )
  }
}


//HOW TO GET THE KEYS WE NEED

// Object.keys(this.props.historicalInfo)

///HOW TO GET TODAY'S DATE TO COMPARE TO HISTORICAL INFORMATION

// let todaysdate = new Date();
//
// todaysdate.getFullYear() + "-" + ("0" + (todaysdate.getMonth() + 1)) + "-" + todaysdate.getDate();
