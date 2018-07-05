import React from 'react';
import Adapter from './adapters/Adapter'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import { addPattern } from './actions'
const DeleteButton = require('./images/delete-icon.png')

const POSTURL = "http://localhost:4000/api/v1/patterns"
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
    }
  }

  handleInput = (event) => {
    if (event.target.name === "amount-investing"){
      this.setState({
        amountInvesting: event.target.value
      })
    }
    else if (event.target.name === "primary-symbol"){
      this.setState({
        primarySymbol: event.target.value
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
    const DELETEID = event.target.parentNode.id
    Adapter.deletePattern("http://localhost:4000/api/v1/patterns/" + DELETEID)
  }

  render(){
    return(
      <div>
        <div className="pattern-form">
          <form onSubmit={this.handleSubmit}>
            <div className="form-amount-investing">Amount Investing: <input className="input-amount-investing" name="amount-investing" type="text" onChange={this.handleInput} /></div>
            <div className="form-primary-symbol">Primary Symbol Name: <input className="input-primary-symbol" name="primary-symbol" type="text" onChange={this.handleInput} /></div>
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
    }
  }
}

const mapStateToProps = state => {
  return {
    patterns: state.pattern.patterns
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Matcher)
