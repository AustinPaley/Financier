import React from 'react'
import {connect} from 'react-redux'
import * as Constants from './adapters/Constants'

class QuoteWindow extends React.Component{
  constructor(props){
    super(props);

    this.state={
      value: ''
    }
  }

  render(){
    return(
      <div>
        <img src={Constants.Construction} alt="Under Construction" />
      </div>
    )
  }
}

export default connect()(QuoteWindow)
