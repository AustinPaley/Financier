import React from 'react'
import {connect} from 'react-redux'
const Construction = require('./images/construction.png')


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
        <img src={Construction} alt="Under Construction" />
      </div>
    )
  }
}

export default connect()(QuoteWindow)
