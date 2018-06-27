import React from 'react'


export default class Form extends React.Component{
  constructor(props){
    super(props);

    this.state={
      value: ''
    }
  }

  handleInput = (event) => {
    this.setState({
      value: event.target.value
    })
  }

  handleSubmit = (event) => {
    this.props.changeStock(event)
    this.setState({
      value: ''
    })
  }

  render(){
    return(
      <div>
        <form onSubmit={this.handleSubmit}>
          <input value={this.state.value} onChange={this.handleInput}/>
          <button type="submit">Change Stock</button>
        </form>
      </div>
    )
  }

}
