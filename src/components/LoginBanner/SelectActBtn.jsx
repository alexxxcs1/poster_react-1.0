import React, { Component } from 'react'
import './scss/banner.scss'

export class SelectAct extends Component {
  render() {
    return (
      <div className={this.props.from =='SelectAct'||this.props.from =='Index'?'selectAct':'unselectAct'} onClick={this.props.attrLogin} to='SelectAct' >
        选择会议
      </div>
    )
  }
}

export default SelectAct
