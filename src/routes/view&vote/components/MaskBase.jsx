import React, { Component } from 'react'
import { hashHistory, Router, Route } from 'react-router'
import './MaskBase.scss'

import { api } from 'common/app'

export class MaskBase extends Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.back2Edit = this.back2Edit.bind(this);
  }
  componentDidMount()
  {
      
  }
  submit()
  {
    api.submitArt(this.props.ArtID).then((res) => {
        console.log(res)
        if (res.status==1) {
            alert('提交成功！')
            hashHistory.push('/User/'+this.props.ActID);
        }
      }, (err) => {
        console.log(err);
      })
  }
  back2Edit()
  {
    hashHistory.push('/Editor/' + this.props.ActID + '/' +this.props.ArtID); 
  }
  render() {
    return (
      <div className='MaseBase' onClick={this.props.hidemask}>
        <div className='controlBox'>
            <div className='qr'><img src={"http://pan.baidu.com/share/qrcode?w=300&h=300&url=" + encodeURIComponent(location.href)} alt=""/></div>
            <div className='btn' onClick={this.back2Edit}>返回去编辑</div>
            <div className='btn' onClick={this.submit}>确认无误去提交</div>
        </div>
      </div>
    )
  }
}

export default MaskBase
