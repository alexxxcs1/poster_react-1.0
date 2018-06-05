import React, { Component } from 'react'

import './ViewBoxInfo.scss'

export class ViewBoxInfo extends Component {
  switchBold()
  {

  }
  render() {
    return (
      <div className='ViewBoxInfo'>
        <div className={this.props.fontStyle}>
          <span>{this.props.title}{this.props.rendContent}</span> 
        </div>
      </div>
    )
  }
}

export default ViewBoxInfo
