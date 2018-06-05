import React, { Component } from 'react'
import './EndBanner.scss';
import endBannerPNG from '../../styles/public_img/endBanner.png'

export class EndBanner extends Component {
  render() {
    return (
      <div className='EndBannerBox'>
        <img src={endBannerPNG} />
      </div>
    )
  }
}

export default EndBanner
