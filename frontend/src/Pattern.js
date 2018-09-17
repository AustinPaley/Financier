import React from 'react'
import { connect } from 'react-redux'
import Adapter from './adapters/Adapter'
import * as Constants from './constants'
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
        {JSXAdapter.validPatternChecker(this.state, this.props, "close") ?
          JSXAdapter.closeInformationOne(this.state, relevantHistory, this.props, PatternChart)
          :
          null
        }
        {JSXAdapter.validPatternInfoChecker(this.state, this.props, "close", relevantHistory) ?
          JSXAdapter.closeInformationTwo(relevantHistory, this.props)
          :
          null
        }
        {JSXAdapter.validPatternChecker(this.state, this.props, "open") ?
          JSXAdapter.openInformationOne(this.state, relevantHistory, this.props, PatternChart)
          :
          null
        }
        {JSXAdapter.validPatternInfoChecker(this.state, this.props, "open", relevantHistory)?
          JSXAdapter.openInformationTwo(relevantHistory, this.props)
          :
          null
        }
        {JSXAdapter.validPatternChecker(this.state, this.props, "high") ?
          JSXAdapter.highInformationOne(this.state, relevantHistory, this.props, PatternChart)
          :
          null
        }
        {JSXAdapter.validPatternInfoChecker(this.state, this.props, "high", relevantHistory) ?
          JSXAdapter.highInformationTwo(relevantHistory, this.props)
          :
          null
        }
        {JSXAdapter.validPatternChecker(this.state, this.props, "low") ?
          JSXAdapter.lowInformationOne(this.state, relevantHistory, this.props, PatternChart)
          :
          null
        }
        {JSXAdapter.validPatternInfoChecker(this.state, this.props, "low", relevantHistory) ?
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
