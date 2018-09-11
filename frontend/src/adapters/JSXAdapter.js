import React from 'react'

class JSXAdapter {
  static validPatternChecker(state, props, type){
    debugger
    return (
      state.history && props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0] !== undefined && props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0][type] !== ""
    )
  }

  static validPatternInfoChecker(state, props, type, relevantHistory){
    return (
      state.history && props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0] !== "" && relevantHistory.find(entry => entry[type].toString() === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0][type]) !== undefined
    )
  }

  static closeInformationOne(state, relevantHistory, props, PatternChart){
    return (
      <div className="patternContainer">
        <h2>Results:</h2>
        {state.history && relevantHistory.find(entry => entry["close"].toString() === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].close) !== undefined
          ?
          <PatternChart pattern={relevantHistory.slice((relevantHistory.map(entry => entry).indexOf(relevantHistory.find(entry => entry["close"].toString() === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].close))), (relevantHistory.map(entry => entry).indexOf(relevantHistory.find(entry => entry["close"].toString() === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].close)) + props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].days)).map(date => date.close)}
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

  static closeInformationTwo(relevantHistory, props){
    return(
      <div className="patternReturnInfo">
        <h3><u>Query Information</u></h3>
        <div>
        <b>Last Time This Happened: </b>
          {relevantHistory.find(entry => entry["close"].toString() === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].close).date}
        </div>
        <div>
        <b>Initial Close: </b>
          {relevantHistory.find(entry => entry["close"].toString() === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].close).close.toString()}
        </div>
        <div>
          <b>Final Close: </b>
          {relevantHistory[relevantHistory.indexOf(relevantHistory.find(entry => entry["close"].toString() === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].close)) + props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].days - 1].close}
        </div>
        <div className="expectedReturn">
          Based on historical data, you can expect <span className="returnAmount">
            ${Math.trunc(props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].investment_size * ((relevantHistory[relevantHistory.indexOf(relevantHistory.find(entry => entry["close"].toString() === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].close)) + props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].days - 1].close) - (relevantHistory.find(entry => entry["close"].toString() === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].close).close.toString())))}</span> in return.
        </div>
      </div>
    )
  }

  static openInformationOne(state, relevantHistory, props, PatternChart){

    return(
      <div className="patternContainer">
        <h2>Results:</h2>
        {state.history && relevantHistory.find(entry => entry["open"].toString() === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].open) !== undefined
          ?
          <PatternChart pattern={relevantHistory.slice((relevantHistory.map(entry => entry).indexOf(relevantHistory.find(entry => entry["open"].toString() === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].open))), (relevantHistory.map(entry => entry).indexOf(relevantHistory.find(entry => entry["open"].toString() === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].open)) + props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].days)).map(date => date.open)}
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

static openInformationTwo(relevantHistory, props){
  return(
    <div className="patternReturnInfo">
      <h3><u>Query Information</u></h3>
      <div>
      <b>Last Time This Happened: </b>
        {relevantHistory.find(entry => entry["open"].toString() === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].open).date}
      </div>
      <div>
      <b>Initial Open: </b>
        {relevantHistory.find(entry => entry["open"].toString() === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].open).open.toString()}
      </div>
      <div>
        <b>Final Open: </b>
        {relevantHistory[relevantHistory.indexOf(relevantHistory.find(entry => entry["open"].toString() === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].open)) + props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].days - 1].open}
      </div>
      <div className="expectedReturn">
        Based on historical data, you can expect <span className="returnAmount">
          ${Math.trunc(props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].investment_size * ((relevantHistory[relevantHistory.indexOf(relevantHistory.find(entry => entry["open"].toString() === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].open)) + props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].days - 1].open) - (relevantHistory.find(entry => entry["open"].toString() === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].open).open.toString())))}</span> in return.
      </div>
    </div>
  )
}

static highInformationOne(state, relevantHistory, props, PatternChart){
  return(
    <div className="patternContainer">
      <h2>Results:</h2>
      {state.history && relevantHistory.find(entry => entry["high"].toString() === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].high) !== undefined
        ?
        <PatternChart pattern={relevantHistory.slice((relevantHistory.map(entry => entry).indexOf(relevantHistory.find(entry => entry["high"].toString() === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].high))), (relevantHistory.map(entry => entry).indexOf(relevantHistory.find(entry => entry["high"].toString() === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].high)) + props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].days)).map(date => date.high)}
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

static highInformationTwo(relevantHistory, props){
  return(
    <div className="patternReturnInfo">
      <h3><u>Query Information</u></h3>
      <div>
      <b>Last Time This Happened: </b>
        {relevantHistory.find(entry => entry["high"].toString() === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].high).date}
      </div>
      <div>
      <b>Initial Open: </b>
        {relevantHistory.find(entry => entry["high"].toString() === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].high).high.toString()}
      </div>
      <div>
        <b>Final Open: </b>
        {relevantHistory[relevantHistory.indexOf(relevantHistory.find(entry => entry["high"].toString() === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].high)) + props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].days - 1].high}
      </div>
      <div className="expectedReturn">
        Based on historical data, you can expect <span className="returnAmount">
          ${Math.trunc(props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].investment_size * ((relevantHistory[relevantHistory.indexOf(relevantHistory.find(entry => entry["high"].toString() === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].high)) + props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].days - 1].high) - (relevantHistory.find(entry => entry["high"].toString() === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].high).high.toString())))}</span> in return.
      </div>
    </div>
  )
}

static lowInformationOne(state, relevantHistory, props, PatternChart){
  return(
    <div className="patternContainer">
      <h2>Results:</h2>
      {state.history && relevantHistory.find(entry => entry["low"].toString() === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].low) !== undefined
        ?
        <PatternChart pattern={relevantHistory.slice((relevantHistory.map(entry => entry).indexOf(relevantHistory.find(entry => entry["low"].toString() === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].low))), (relevantHistory.map(entry => entry).indexOf(relevantHistory.find(entry => entry["low"].toString() === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].low)) + props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].days)).map(date => date.low)}
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

static lowInformationTwo(relevantHistory, props){
  return(
    <div className="patternReturnInfo">
      <h3><u>Query Information</u></h3>
      <div>
      <b>Last Time This Happened: </b>
        {relevantHistory.find(entry => entry["low"].toString() === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].low).date}
      </div>
      <div>
      <b>Initial Close: </b>
        {relevantHistory.find(entry => entry["low"].toString() === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].low).low.toString()}
      </div>
      <div>
        <b>Final Close: </b>
        {relevantHistory[relevantHistory.indexOf(relevantHistory.find(entry => entry["low"].toString() === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].low)) + props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].days - 1].low}
      </div>
      <div className="expectedReturn">
        Based on historical data, you can expect <span className="returnAmount">
          ${Math.trunc(props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].investment_size * ((relevantHistory[relevantHistory.indexOf(relevantHistory.find(entry => entry["low"].toString() === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].low)) + props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].days - 1].low) - (relevantHistory.find(entry => entry["low"].toString() === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].low).low.toString())))}</span> in return.
      </div>
    </div>
  )
}



}

export default JSXAdapter
