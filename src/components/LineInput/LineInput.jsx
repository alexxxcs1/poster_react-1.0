import React, { Component } from 'react'
import './LineInput.scss'

export class LineInput extends Component {
  render() {
    return (
      <div className='LineInputBox'>
        <div className='InputName'>
            <span>{this.props.InputName}</span>
        </div>
        <div className='InputBox'>
            {this.props.InputContent}
        </div>
      </div>
    )
  }
}

export default LineInput
