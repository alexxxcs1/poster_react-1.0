import React, { Component } from 'react'
import './scss/MainKV.scss'
import topbanner from './imgs/topbanner.png'

export class MainKV extends Component {
  render() {
    return (
      <div className='MainKV'>
        <img src={topbanner} />
      </div>
    )
  }
}

export default MainKV
