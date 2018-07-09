import React from 'react';
import Adapter from './adapters/Adapter'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import { addPattern, removePattern } from './actions'
import MatcherChart from './components/MatcherChart'
const DeleteButton = require('./images/delete-icon.png')

const POSTURL = "http://localhost:4000/api/v1/patterns"
const DELETEURL = "http://localhost:4000/api/v1/patterns/"

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
    }
  }

  handleInput = (event) => {
    debugger
    if (event.target.name === "amount-investing"){
      this.setState({
        amountInvesting: event.target.value
      })
    }
    else if (event.target.name === "primary-symbol" && event.target.value !== "Select Company Symbol..."){
      this.setState({
        primarySymbol: event.target.value
      })
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
    Adapter.postPattern(POSTURL, this.state.user_id, this.state.primarySymbol, this.state.open, this.state.close, this.state.high, this.state.low, this.state.amountInvesting, this.state.days)
    .then(res => {
      this.props.addPattern(res)
      this.props.history.push(`/pattern/${res.id}`)
    })
  }

  handleDelete = (event) =>{
    event.preventDefault()
    const DELETEID = event.target.parentNode.id
    const TOBEDELETED = event.target.parentNode
    Adapter.deletePattern(DELETEURL + DELETEID)
    .then(res => {
      alert("Pattern " + res.item.id + " has been removed.")
      this.props.removePattern({
      type: "DELETE_PATTERN",
      payload: res.item})
    })
  }

  render(){
    return(
      <div>
        {this.state.primarySymbol !== ''
          ?
          <MatcherChart primarySymbol={this.state.primarySymbol} fullSymbol={this.state}/>
          :
          <div className="Spaceholder">
            <br />
            <h2>Enter a Symbol to See Historical Data</h2>
          </div>
        }
        <div className="pattern-form">
          <form onSubmit={this.handleSubmit}>
            <div className="form-amount-investing">Amount Investing: <input className="input-amount-investing" name="amount-investing" type="text" onChange={this.handleInput} /></div><br/>
            <div className="form-primary-symbol">Primary Symbol Name: <input className="input-primary-symbol" name="primary-symbol" type="text" onChange={this.handleInput} value={this.state.primarySymbol} /><br/>
             <em>or</em>
            <select className="input-primary-symbol" name="primary-symbol" type="select" onChange={this.handleInput}>
            <option default>Select Company Symbol...</option>
              {this.state.symbol_options.map(symbol => {
                return(
                <option value={symbol.symbol}>{symbol.name.toString().substring(0, 30) + "..."}</option>)})}
            </select>
            </div>
            <div className="pattern-selector">Open<input className="pattern-input" name="open" type="text" onChange={this.handleInput} /></div>
            <div className="pattern-selector">Previous Close:<input className="pattern-input" name="close" type="text" onChange={this.handleInput} /></div>
            <div className="pattern-selector">High:<input className="pattern-input" name="high" type="text" onChange={this.handleInput} /></div>
            <div className="pattern-selector">Low:<input className="pattern-input" name="low" type="text" onChange={this.handleInput} /></div>
            <div className="pattern-selector">Number of Days:<input className="pattern-input" name="days" type="text" onChange={this.handleInput} /></div>
            <br /><br />
            <button className="pattern-condition-button">Add New Condition</button>
            <br /><br/>
            <input type="submit" value="Run" className="pattern-button" />
          </form>
        </div>
        <div className="saved-patterns">
          <h3>Saved Patterns</h3>
            {this.props.patterns.length > 0 ? this.props.patterns[0].patterns.payload.map(pattern =>{
              return(
              <div id={pattern.id}>
                <Link to={'/pattern/' + pattern.id}>Pattern: {pattern.id}</Link>
                <img className="delete_button" alt="Delete Button" src={DeleteButton} style={{width: 10, height: 10}} onClick={this.handleDelete} />
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
