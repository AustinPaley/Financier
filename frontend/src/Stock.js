import React from 'react'
const responseAdapt = {
  H: 'Trading halt across all US Markets',
  O: 'Trading halt released into an OAP',
  P: 'Trading Paused',
  T: 'Trading',
}


export default class Stock extends React.Component{
  constructor(props){
    super(props);
    this.state={
      value: '',
      status: ''
    }

  }

  render(){
    const renderStatus = responseAdapt[this.props.stockStatus]
    return (
    <div>
    {this.props.generalInfo.length === 0 ?
      <div>Loading...</div> :
      <div>
        <h2>Today's {this.props.generalInfo["Meta Data"]["2. Symbol"]} Data</h2>
        <em>Current Status: {this.props.stockStatus === '' ? "N/A" : renderStatus}</em>
        <h3>Open: {this.props.generalInfo["Time Series (Daily)"]["2018-06-13"]["1. open"]}</h3>
        <h3>High: {this.props.generalInfo["Time Series (Daily)"]["2018-06-13"]["2. high"]}</h3>
        <h3>Low: {this.props.generalInfo["Time Series (Daily)"]["2018-06-13"]["3. low"]}</h3>
        <h3>Close: {this.props.generalInfo["Time Series (Daily)"]["2018-06-13"]["4. close"]}</h3>
        <h3>Volume: {this.props.generalInfo["Time Series (Daily)"]["2018-06-13"]["5. volume"]}</h3>
      </div>}
    </div>
    )
  }
}
