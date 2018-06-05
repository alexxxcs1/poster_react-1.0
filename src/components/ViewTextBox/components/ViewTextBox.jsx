import React, { Component } from 'react'
import './ViewTextBox.scss'

export class ViewTextBox extends Component {
  render() {
    return (
      <div className='ViewTextBox'>
        <div className='BoxTitle'>
            <span>{this.props.title}:</span> 
        </div>
        <div className='ViewBoxContent' >
            <div dangerouslySetInnerHTML={{__html:this.props.rendContent}}>

            </div>
        </div>
      </div>
    )
  }
}

export default ViewTextBox
