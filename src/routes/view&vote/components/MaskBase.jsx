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
      <div className='MaskBase' onClick={this.props.hidemask}>
        <div className='controlBox'>
            <div className='tipsqr'>扫描下方二维码即可在手机上预览</div>
            <div className='qr'><img src={"http://qr.liantu.com/api.php?text=" + encodeURIComponent(location.href)} alt=""/></div>
            <div className='btn' onClick={this.back2Edit}>返回去编辑</div>
            <div className='btn' onClick={this.submit}>确认无误提交</div>
        </div>
      </div>
    )
  }
}

export default MaskBase
