import React, { Component } from 'react'
import style from  './View.scss'

import MaskBase from './components/MaskBase'
import HeaderKV from '../../components/HeaderKV/HeaderKV'
import ContentListBox from '../../components/ViewTextBox/ListBox'
import EndBanner from '../../components/ViewEndBanner/EndBanner'

import { api,ua } from 'common/app'

export class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      KVurl:'Index',
      showMask:false,
      PC:false,
      from:null,
    };
    this.togleMask = this.togleMask.bind(this);
    this.switchBtn = this.switchBtn.bind(this);
  }
  componentDidMount()
  { 
    var urlName = location.hash.split("/");
    this.setState({
      from:urlName[1],
    })
    
    if (ua.getOsName() == 'Windows' ||ua.getOsName() == 'Mac OS') {
      this.setState({
        PC:true,
      })
    }
    var ActID = this.props.params.actid;

    api.ActInfo(ActID).then((res) => {
      this.setState({
        KVurl:'http://wechat.crnonline.org/'+res.data.info.head_img,
      })
      console.log(res);
    }, (err) => {
      console.log(err);
    })

  }
  togleMask()
  {
    this.setState({
      showMask:!this.state.showMask,
    })
  }
  switchBtn()
  {
    switch (this.state.from) {
      case 'View':
          return this.state.PC?<div className='Phone2Viewbtn' onClick={this.togleMask}>去手机上预览</div>:'';
          break;
      case 'Vote':
          return <div className='fixVote'>
              <div> 为他投票! </div>
          </div>
          break;
    }
  }
  render() {
    return (
      <div className='ViewBox'>
        {this.state.showMask?<MaskBase  ActID={this.props.params.actid} ArtID={this.props.params.artid} hidemask={this.togleMask}/>:''}
        <HeaderKV KVurl={this.state.KVurl}/>
        <ContentListBox artid={this.props.params.artid}/>
        {this.switchBtn()}
        <EndBanner/>
      </div>
    )
  }
}

export default View
