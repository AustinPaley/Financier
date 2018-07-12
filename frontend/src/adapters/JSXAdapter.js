import React from 'react'

class JSXAdapter {
  static closeInformationOne(state, relevantHistory, props, PatternChart){

    return(
      <div className="patternContainer">
        <h2>Results:</h2>
          {state.history && Object.entries(relevantHistory).find(entry => entry[1]["4. close"].slice(0, -2) === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].close
) !== undefined
          ?
          <PatternChart pattern={Object.entries(relevantHistory).slice((Object.entries(relevantHistory).map(entry => entry[0]).indexOf(Object.entries(relevantHistory).find(entry => entry[1]["4. close"].slice(0, -2) === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].close)[0]) - props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].days), (Object.entries(relevantHistory).map(entry => entry[0]).indexOf(Object.entries(relevantHistory).find(entry => entry[1]["4. close"].slice(0, -2) === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].close)[0]))+1).map(date => parseFloat(date[1]["4. close"].slice(0, -2))).reverse()}/>
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
        <b>Last Time This Happened:</b> {Object.entries(relevantHistory).find(entry => entry[1]["4. close"].slice(0, -2) === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].close)[0]}
        </div>
        <div>
        <b>Initial Close:</b> {Object.entries(relevantHistory).find(entry => entry[1]["4. close"].slice(0, -2) === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].close)[1]["4. close"]}
        </div>
        <div><b>Final Close:</b> {Object.entries(relevantHistory)[Object.entries(relevantHistory).map(entry => entry[0]).indexOf(Object.entries(relevantHistory).find(entry => entry[1]["4. close"].slice(0, -2) === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].close)[0]) - props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].days][1]["4. close"]}
        </div>
        <div className="expectedReturn">Based on historical data, you can expect <span className="returnAmount">${Math.trunc(props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].investment_size * ((Object.entries(relevantHistory)[Object.entries(relevantHistory).map(entry => entry[0]).indexOf(Object.entries(relevantHistory).find(entry => entry[1]["4. close"].slice(0, -2) === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].close)[0]) - props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].days][1]["4. close"]) - (Object.entries(relevantHistory).find(entry => entry[1]["4. close"].slice(0, -2) === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].close)[1]["4. close"])))}</span> in return. </div>
      </div>
    )
  }

  static openInformationOne(state, relevantHistory, props, PatternChart){

    return(
      <div className="patternContainer">
        <h2>Results:</h2>
          {state.history && Object.entries(relevantHistory).find(entry => entry[1]["1. open"].slice(0, -2) === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].open
) !== undefined
          ?
          <PatternChart pattern={Object.entries(relevantHistory).slice((Object.entries(relevantHistory).map(entry => entry[0]).indexOf(Object.entries(relevantHistory).find(entry => entry[1]["1. open"].slice(0, -2) === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].open)[0]) - props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].days), (Object.entries(relevantHistory).map(entry => entry[0]).indexOf(Object.entries(relevantHistory).find(entry => entry[1]["1. open"].slice(0, -2) === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].open)[0]))+1).map(date => parseFloat(date[1]["1. open"].slice(0, -2))).reverse()}/>
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
      <b>Last Time This Happened:</b> {Object.entries(relevantHistory).find(entry => entry[1]["1. open"].slice(0, -2) === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].open)[0]}
      </div>
      <div>
      <b>Initial Close:</b> {Object.entries(relevantHistory).find(entry => entry[1]["1. open"].slice(0, -2) === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].open)[1]["1. open"]}
      </div>
      <div><b>Final Close:</b> {Object.entries(relevantHistory)[Object.entries(relevantHistory).map(entry => entry[0]).indexOf(Object.entries(relevantHistory).find(entry => entry[1]["1. open"].slice(0, -2) === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].open)[0]) - props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].days][1]["1. open"]}
      </div>
      <div className="expectedReturn">Based on historical data, you can expect <span className="returnAmount">${Math.trunc(props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].investment_size * ((Object.entries(relevantHistory)[Object.entries(relevantHistory).map(entry => entry[0]).indexOf(Object.entries(relevantHistory).find(entry => entry[1]["1. open"].slice(0, -2) === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].open)[0]) - props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].days][1]["1. open"]) - (Object.entries(relevantHistory).find(entry => entry[1]["1. open"].slice(0, -2) === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].open)[1]["1. open"])))}</span> in return. </div>
    </div>
  )
}

static highInformationOne(state, relevantHistory, props, PatternChart){

  return(
    <div className="patternContainer">
      <h2>Results:</h2>
        {state.history && Object.entries(relevantHistory).find(entry => entry[1]["2. high"].slice(0, -2) === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].high
) !== undefined
        ?
        <PatternChart pattern={Object.entries(relevantHistory).slice((Object.entries(relevantHistory).map(entry => entry[0]).indexOf(Object.entries(relevantHistory).find(entry => entry[1]["2. high"].slice(0, -2) === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].high)[0]) - props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].days), (Object.entries(relevantHistory).map(entry => entry[0]).indexOf(Object.entries(relevantHistory).find(entry => entry[1]["2. high"].slice(0, -2) === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].high)[0]))+1).map(date => parseFloat(date[1]["2. high"].slice(0, -2))).reverse()}/>
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
      <b>Last Time This Happened:</b> {Object.entries(relevantHistory).find(entry => entry[1]["2. high"].slice(0, -2) === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].high)[0]}
      </div>
      <div>
      <b>Initial Close:</b> {Object.entries(relevantHistory).find(entry => entry[1]["2. high"].slice(0, -2) === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].high)[1]["2. high"]}
      </div>
      <div><b>Final Close:</b> {Object.entries(relevantHistory)[Object.entries(relevantHistory).map(entry => entry[0]).indexOf(Object.entries(relevantHistory).find(entry => entry[1]["2. high"].slice(0, -2) === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].high)[0]) - props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].days][1]["2. high"]}
      </div>
      <div className="expectedReturn">Based on historical data, you can expect <span className="returnAmount">${Math.trunc(props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].investment_size * ((Object.entries(relevantHistory)[Object.entries(relevantHistory).map(entry => entry[0]).indexOf(Object.entries(relevantHistory).find(entry => entry[1]["2. high"].slice(0, -2) === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].high)[0]) - props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].days][1]["2. high"]) - (Object.entries(relevantHistory).find(entry => entry[1]["2. high"].slice(0, -2) === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].high)[1]["2. high"])))}</span> in return. </div>
    </div>
  )
}

static lowInformationOne(state, relevantHistory, props, PatternChart){

  return(
    <div className="patternContainer">
      <h2>Results:</h2>
        {state.history && Object.entries(relevantHistory).find(entry => entry[1]["3. low"].slice(0, -2) === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].low
) !== undefined
        ?
        <PatternChart pattern={Object.entries(relevantHistory).slice((Object.entries(relevantHistory).map(entry => entry[0]).indexOf(Object.entries(relevantHistory).find(entry => entry[1]["3. low"].slice(0, -2) === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].low)[0]) - props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].days), (Object.entries(relevantHistory).map(entry => entry[0]).indexOf(Object.entries(relevantHistory).find(entry => entry[1]["3. low"].slice(0, -2) === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].low)[0]))+1).map(date => parseFloat(date[1]["3. low"].slice(0, -2))).reverse()}/>
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
      <b>Last Time This Happened:</b> {Object.entries(relevantHistory).find(entry => entry[1]["3. low"].slice(0, -2) === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].low)[0]}
      </div>
      <div>
      <b>Initial Close:</b> {Object.entries(relevantHistory).find(entry => entry[1]["3. low"].slice(0, -2) === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].low)[1]["3. low"]}
      </div>
      <div><b>Final Close:</b> {Object.entries(relevantHistory)[Object.entries(relevantHistory).map(entry => entry[0]).indexOf(Object.entries(relevantHistory).find(entry => entry[1]["3. low"].slice(0, -2) === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].low)[0]) - props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].days][1]["3. low"]}
      </div>
      <div className="expectedReturn">Based on historical data, you can expect <span className="returnAmount">${Math.trunc(props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].investment_size * ((Object.entries(relevantHistory)[Object.entries(relevantHistory).map(entry => entry[0]).indexOf(Object.entries(relevantHistory).find(entry => entry[1]["3. low"].slice(0, -2) === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].low)[0]) - props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].days][1]["3. low"]) - (Object.entries(relevantHistory).find(entry => entry[1]["3. low"].slice(0, -2) === props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].low)[1]["3. low"])))}</span> in return. </div>
    </div>
  )
}



}

export default JSXAdapter
