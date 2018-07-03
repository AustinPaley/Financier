import React from 'react'
import { connect } from 'react-redux'

class Pattern extends React.Component{
  render(){
    console.log(this.props.pattern)
    return(
      <div>
        {this.props.pattern !== undefined ?
          this.props.pattern.map(pattern => {
            return(
              <div>
                <div>Symbol: {pattern.symbol}</div>
                <div>Investment Size: {pattern.investment_size}</div>
                <div>Open: {pattern.open}</div>
                <div>High: {pattern.high}</div>
                <div>Low: {pattern.low}</div>
                <div>Close: {pattern.close}</div>
              </div>
            )
          })
        :
        null}
      </div>
    )
  }
}

const mapStateToProps = state => {
  if (state.pattern.patterns[0] !== undefined && state.pattern.patterns[0].patterns.payload.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", ""))) !== null){
    return {
      pattern: state.pattern.patterns[0].patterns.payload.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))
    }
  }
}

export default connect(mapStateToProps)(Pattern)
