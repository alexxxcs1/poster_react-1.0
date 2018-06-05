import React, { Component } from 'react'
import './RoundBtn.scss'

export class RoundBtn extends Component {
  render() {
    return (
      <div className='RoundBtn' onClick={this.props.func} to={this.props.to}>
        {this.props.btnName}
      </div>
    )
  }
}

export default RoundBtn
