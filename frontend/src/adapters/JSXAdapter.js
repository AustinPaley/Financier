import React from 'react'

class JSXAdapter {
  static validPatternChecker(state, props, type){
    return (
      state.history && props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0] !== undefined && props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0][type] !== ""
    )
  }

  static validPatternInfoChecker(state, props, type, relevantHistory){
    return (
      state.history && props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0] !== "" && relevantHistory.find(entry => entry[type].toString() === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0][type]) !== undefined
    )
  }

  static informationOne(state, relevantHistory, props, PatternChart, type){
    debugger
    return (
      <div className="patternContainer">
        <h2>Results:</h2>
        {state.history && relevantHistory.find(entry => entry[type].toString() === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0][type]) !== undefined
          ?
          <PatternChart pattern={relevantHistory.slice((relevantHistory.map(entry => entry).indexOf(relevantHistory.find(entry => entry[type].toString() === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0][type]))), (relevantHistory.map(entry => entry).indexOf(relevantHistory.find(entry => entry[type].toString() === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0][type])) + props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].days)).map(date => date[type])}
          />
          :
          <div className="invalidPattern">This pattern is invalid. Please return to the Pattern Matcher page, delete it, and try again.</div>
        }
        <div className="patternParameters">
          <h3><u>Search Parameters:</u></h3>
            <div><b>Symbol:</b> {props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].symbol.toUpperCase()}</div>
            <div><b>Shares Purchased: </b> {props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].investment_size}</div>
            <div><b>Open:</b> {props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].open}</div>
            <div><b>High:</b> {props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].high}</div>
            <div><b>Low:</b> {props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].low}</div>
            <div><b>Close:</b> {props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].close}</div><br/>
        </div>
      </div>
    )
  }

  static informationTwo(relevantHistory, props, type){
    return(
      <div className="patternReturnInfo">
        <h3><u>Query Information</u></h3>
        <div>
        <b>Last Time This Happened: </b>
          {relevantHistory.find(entry => entry[type].toString() === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0][type]).date}
        </div>
        <div>
        <b>Initial Close: </b>
          {relevantHistory.find(entry => entry[type].toString() === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0][type])[type].toString()}
        </div>
        <div>
          <b>Final Close: </b>
          {relevantHistory[relevantHistory.indexOf(relevantHistory.find(entry => entry[type].toString() === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0][type])) + props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].days - 1][type]}
        </div>
        <div className="expectedReturn">
          Based on historical data, you can expect <span className="returnAmount">
            ${Math.trunc(props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].investment_size * ((relevantHistory[relevantHistory.indexOf(relevantHistory.find(entry => entry[type].toString() === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0][type])) + props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].days - 1][type]) - (relevantHistory.find(entry => entry[type].toString() === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0][type])[type].toString())))}</span> in return.
        </div>
      </div>
    )
  }

}

export default JSXAdapter
