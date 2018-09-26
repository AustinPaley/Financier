import React from 'react';
import Adapter from './adapters/Adapter'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import { addPattern, removePattern, createPattern } from './actions'
import MatcherChart from './components/MatcherChart'
import * as Constants from './constants'
let Yes = null

class Matcher extends React.Component{
  constructor(props){
    super(props)
    this.state={
      amountInvesting: '',
      primarySymbol: '',
      open: '',
      close: '',
      high: '',
      low: '',
      days: '',
      user_id: localStorage.getItem("id"),
      user_patterns: [],
      symbol_options: this.props.symbols,
      symbolInput: '',
      loading: false,
      selectedPatternType: null,
    }
  }

  componentDidMount(){
    Adapter.patternFetch("http://localhost:4000/api/v1/patterns")
    .then(res => {
      if(res.message !== "Not Authorized"){
        this.props.addPattern(res)
      }
    })
  }

  handleInput = (event) => {
    if (event.target.name === "amount-investing"){
      this.setState({
        amountInvesting: event.target.value,
      })
    }

    else if (event.target.name === "primary-symbol" && event.target.value !== "Select Company Symbol..."){
      const SymbolSearched = event.target.value.toUpperCase()
      this.setState({
        symbolInput: event.target.value,
        loading: true
      })
      clearTimeout(Yes)
      Yes = setTimeout(() => {
        this.setState({
          primarySymbol: SymbolSearched,
          loading: false
        })
      }, 5000)
    }

    else if (event.target.name === "primary-symbol" && event.target.value === "Select Company Symbol..."){
      this.setState({
        primarySymbol: ''
      })
    }

    else if (event.target.name === "open"){
      this.setState({
        open: event.target.value
      })
    }

    else if (event.target.name === "close"){
      this.setState({
        close: event.target.value
      })
    }

    else if (event.target.name === "high"){
      this.setState({
        high: event.target.value
      })
    }

    else if (event.target.name === "low"){
      this.setState({
        low: event.target.value
      })
    }

    else if (event.target.name === "days"){
      this.setState({
        days: event.target.value
      })
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    Adapter.postPattern(Constants.POSTURL, this.state.user_id, this.state.symbolInput, this.state.open, this.state.close, this.state.high, this.state.low, this.state.amountInvesting, this.state.days)
    .then(res => {
      this.props.createPattern(res)
      this.props.history.push(`/pattern/${res.id}`)
    })
  }

  handleDelete = (event) =>{
    event.preventDefault()
    const DELETEID = event.target.parentNode.id
    Adapter.deletePattern(Constants.DELETEURL + DELETEID)
    .then(res => {
      alert("Pattern " + res.item.id + " has been removed.")
      this.props.removePattern(res.item)
    })
  }

  handlePatternType = (event) => {
    if (event.target.value === "null"){
      this.setState({
        selectedPatternType: null
      })
    }
    else {
      this.setState({
        selectedPatternType: event.target.value
      })
    }
  }

  render(){
    return(
      <div>
        {this.state.primarySymbol !== ''
          ?
          <MatcherChart primarySymbol={this.state.primarySymbol}/>
          :
          this.state.loading === false ?
            <div className="Spaceholder">
            <br />
            <h2>Enter a Symbol to See Historical Data</h2>
            </div>
            :
            <div className="Spaceholder">
            <br />
            <h2>Enter a Symbol to See Historical Data</h2>
            <br />
            <img className="MatcherLoadingWheel" alt="loadingWheel" src={Constants.LoadingWheel} />
            </div>
        }
        <div className="pattern-form">
          <form onSubmit={this.handleSubmit}>
            <div className="form-primary-symbol">Primary Symbol Name: <input className="input-primary-symbol" name="primary-symbol" type="text" onChange={this.handleInput} value={this.state.symbolInput} />
             <div className="form-primary-alt"><em>or</em>
            <select className="input-primary-symbol" name="primary-symbol" type="select" onChange={this.handleInput}>
            <option default>Select Company Symbol...</option>
              {this.state.symbol_options.map(symbol => {
                return(
                <option value={symbol.symbol}>{symbol.name.toString().substring(0, 30) + "..."}</option>)})}
            </select>
            </div>
            </div>
            <div className="form-amount-investing">Shares to Purchase: <input className="input-amount-investing" name="amount-investing" type="text" onChange={this.handleInput} />
            </div>
            <div className="form-amount-investing">
              Select Pattern Type:
              <select className="pattern-selector-dropdown" name="pattern-selector" type="select" onChange={this.handlePatternType}>
              <option default value="null">Select Pattern Type...</option>
              <option value="Open">Open</option>
              <option value="Previous Close">Previous Close</option>
              <option value="High">High</option>
              <option value="Low">Low</option>
              </select>
            </div>
            {this.state.selectedPatternType === "Open" ?
              <div className="pattern-selector">Open:<input className="pattern-input" name="open" type="text" onChange={this.handleInput} /></div>
              :
              null
            }
            {this.state.selectedPatternType === "Previous Close" ?
              <div className="pattern-selector">Previous Close:<input className="pattern-input" name="close" type="text" onChange={this.handleInput} /></div>
              :
              null
            }
            {this.state.selectedPatternType === "High" ?
              <div className="pattern-selector">High:<input className="pattern-input" name="high" type="text" onChange={this.handleInput} /></div>
              :
              null
            }
            {this.state.selectedPatternType === "Low" ?
              <div className="pattern-selector">Low:<input className="pattern-input" name="low" type="text" onChange={this.handleInput} /></div>
              :
              null
            }
            {this.state.selectedPatternType !== null ?
              <div className="number-of-days">Number of Days:<input className="pattern-input" name="days" type="text" onChange={this.handleInput} /></div>
              :
              null
            }
            <input type="submit" value="Run" className="pattern-button" />
          </form>
        </div>
        <div className="saved-patterns">
          <h3>Saved Patterns</h3>
            {this.props.patterns.length > 0 ? this.props.patterns.map(pattern =>{
              return(
              <div id={pattern.id}>
                <Link to={'/pattern/' + pattern.id}>Pattern: {pattern.id}</Link>
                <img className="delete_button" alt="Delete Button" src={Constants.DeleteButton} style={{width: 10, height: 10}} onClick={this.handleDelete} />
              </div>
              )
            })
            :
            null
            }
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    addPattern: (res) => {
      dispatch(addPattern(res))
    },
    removePattern: (res) => {
      dispatch(removePattern(res))
    },
    createPattern: (res) => {
      dispatch(createPattern(res))
    }
  }
}

const mapStateToProps = state => {
  return {
    patterns: state.pattern.patterns,
    symbols: state.symbols.symbols
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Matcher)
