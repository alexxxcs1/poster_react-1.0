import React, { Component } from 'react'
import RoundBtn from './roundBtn/RoundBtn'

import './BtnGroup.scss'

export class BtnGroup extends Component {
  render() {
    return (
      <div className='BtnGroup'>

            <RoundBtn func={this.props.changeSteep} to='back' btnName='上一步'/>

            <RoundBtn func={this.props.changeSteep} to='next' btnName='下一步'/>        

      </div>
    )
  }
}

export default BtnGroup
