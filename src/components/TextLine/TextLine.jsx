import React, { Component } from 'react'
import './TextLine.scss'

export class TextLine extends Component {
  render() {
    return (
      <div className='TextLine'>
            {this.props.text}
      </div>
    )
  }
}

export default TextLine
