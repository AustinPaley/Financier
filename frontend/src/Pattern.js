import React from 'react'
import { connect } from 'react-redux'

class Pattern extends React.Component{
  render(){
    return(
      <div>
        Pattern
      </div>
    )
  }
}

export default connect()(Pattern)
