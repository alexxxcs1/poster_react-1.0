import React, { Component } from 'react'
import './HeaderKV.scss'

export class HeaderKV extends Component {
  render() {
    return (
      <div className='KVbox'>
        <img src={this.props.KVurl} alt=""/>
      </div>
    )
  }
}

export default HeaderKV
