import React, { Component } from 'react'

import BoxInput from '../components/BoxInput/BoxInput'
import BtnGroup from '../components/BtnGroup'

import './steep.scss'
//须知页
export class Steep1 extends Component {
  render() {
    return (
      <div className='steep'>
        <BoxInput title='Poster题目' changeContent={this.props.changeContent} id='title' oldContent={this.props.oldContent?this.props.oldContent.title:null}/>
        <BoxInput title='作者' changeContent={this.props.changeContent} id='author' oldContent={this.props.oldContent?this.props.oldContent.author:null}/>
        <BoxInput title='所在工作单位/机构' changeContent={this.props.changeContent} id='company' oldContent={this.props.oldContent?this.props.oldContent.company:null}/>
        <BtnGroup changeSteep={this.props.changeSteep}/>
      </div>
    )
  }
}

export default Steep1
