import React, { Component } from 'react'

// import BoxTextArea from '../components/BoxTextArea/BoxTextArea'
// import WanEditor from '../components/wanEditor/wangEditorBox'
// import QuillEditor from '../components/quillEditor/QuillEditor'
import NewEditor from '../components/NewEditor/NewEditor'

import BtnGroup from '../components/BtnGroup'


import './steep.scss'
//须知页
export class Steep2 extends Component {

  render() {
    return (
      <div className='steep'>
         
         <NewEditor title='目的' changeContent={this.props.changeContent} id='goal' oldContent={this.props.oldContent?this.props.oldContent.goal:null}/>
         <NewEditor title='方法' changeContent={this.props.changeContent} id='month' oldContent={this.props.oldContent?this.props.oldContent.month:null}/>
         <NewEditor title='结果' changeContent={this.props.changeContent} id='over' oldContent={this.props.oldContent?this.props.oldContent.over:null}/>
         <NewEditor title='结论' changeContent={this.props.changeContent} id='verdict' oldContent={this.props.oldContent?this.props.oldContent.verdict:null}/>
         <BtnGroup changeSteep={this.props.changeSteep}/>
      </div>
    )
  }
}

export default Steep2
