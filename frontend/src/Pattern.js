import React from 'react'
import { connect } from 'react-redux'
import Adapter from './adapters/Adapter'
import * as Constants from './adapters/Constants'
import JSXAdapter from './adapters/JSXAdapter'
import PatternChart from './components/PatternChart'

class Pattern extends React.Component{
  constructor(props){
    super(props)

    this.state={
      history: '',
      patterninfo: {},
    }
  }

  componentDidMount(){
    if (this.props.patterns !== undefined && this.props.patterns.length !== undefined && this.props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", ""), 10))[0] !== undefined){
      let currentSymbol = this.props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].symbol
      Adapter.patternFetch("http://localhost:4000/api/v1/patterns/" + this.props.match.params.patternid)
      .then (res => {
        this.setState({
          patterninfo: res
        })
      })

      Adapter.makeFetch(Constants.IEXURL + currentSymbol + "/chart/3m")
      .then (res => {
        this.setState({
          history: res
        })
      })
    }
  }

  render(){
    const relevantHistory = this.state.history
    return(
      <div>
        {this.props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0] !== undefined && this.props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].close !== "" ?
          JSXAdapter.closeInformationOne(this.state, relevantHistory, this.props, PatternChart)
          :
          null
        }
        {this.state.history && this.props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0] !== "" && relevantHistory.find(entry => entry.close.toString() === this.props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].close) !== undefined ?
          JSXAdapter.closeInformationTwo(relevantHistory, this.props)
          :
          null
        }
        {this.props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0] !== undefined && this.props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].open !== "" ?
          JSXAdapter.openInformationOne(this.state, relevantHistory, this.props, PatternChart)
          :
          null
        }
        {this.state.history && this.props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0] !== "" && relevantHistory.find(entry => entry.open.toString() === this.props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].open) !== undefined ?
          JSXAdapter.openInformationTwo(relevantHistory, this.props)
          :
          null
        }
        {this.props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0] !== undefined && this.props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].high !== "" ?
          JSXAdapter.highInformationOne(this.state, relevantHistory, this.props, PatternChart)
          :
          null
        }
        {this.state.history && this.props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0] !== "" && relevantHistory.find(entry => entry.high.toString() === this.props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].high) !== undefined ?
          JSXAdapter.highInformationTwo(relevantHistory, this.props)
          :
          null
        }
        {this.props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0] !== undefined && this.props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].low !== "" ?
          JSXAdapter.lowInformationOne(this.state, relevantHistory, this.props, PatternChart)
          :
          null
        }
        {this.state.history && this.props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0] !== "" && relevantHistory.find(entry => entry.low.toString() === this.props.patterns.filter(pattern => pattern.id === parseInt(window.location.pathname.replace("/pattern/", "")))[0].low) !== undefined ?
          JSXAdapter.lowInformationTwo(relevantHistory, this.props)
          :
          null
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    patterns: state.pattern.patterns
  }
}

export default connect(mapStateToProps)(Pattern)
