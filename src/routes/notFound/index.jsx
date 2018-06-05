import React, { Component } from 'react'
import './NotFound.scss'

export class NotFound extends Component {
  render() {
    return (
      <div className='NotFoundBox'>
          
          <div className='NotFoundTips'>
            <p>Sorry,页面未找到,请确认是否是正确的地址！</p>  
          </div>

      </div>
    )
  }
}

export default NotFound
