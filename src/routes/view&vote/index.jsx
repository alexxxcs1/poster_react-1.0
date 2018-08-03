import React, { Component } from 'react'
import style from  './View.scss'

import MaskBase from './components/MaskBase'
import HeaderKV from '../../components/HeaderKV/HeaderKV'
import ContentListBox from '../../components/ViewTextBox/ListBox'
import EndBanner from '../../components/ViewEndBanner/EndBanner'
import CombLoading from '../../components/CombLoading';

import { api,ua } from 'common/app'

export class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      KVurl:'',
      showMask:false,
      showUploadBtn:false,
      PC:false,
      from:null,
      vote_votenum:0,
      isvoted:true,
      loading:false,
    };
    this.togleMask = this.togleMask.bind(this);
    this.switchBtn = this.switchBtn.bind(this);
    this.vote = this.vote.bind(this);
    this.showUpload = this.showUpload.bind(this);
  }
  componentWillReceiveProps(nextprop)
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

    var ActID = nextprop.params.actid;
    var ArtID = nextprop.params.artid;
    if(urlName[1]=='Vote')
    {
      var VoteID = nextprop.params.voteid;
      api.Vote(VoteID,ActID,ArtID,'isVoted').then((res) => {
        if (res.status == 0) {
          this.setState({
            isvoted:true,
          })
        }else
        {
          this.setState({
            isvoted:false,
          })
        }
        console.log(res);
      }, (err) => {
        console.log(err);
      })
  
      api.VoteNum(ArtID).then((res) => {
        this.setState({
          vote_votenum:res.num
        })
        console.log(res);
      }, (err) => {
        console.log(err);
      })
    }
    

    api.ActInfo(ActID).then((res) => {
      this.setState({
        KVurl:'http://wechat.crnonline.org/'+res.data.info.head_img,
      })
      console.log(res);
    }, (err) => {
      console.log(err);
    })
  }
  componentDidMount()
  { 
    this.setState({
      loading:true,
    })
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
    var ArtID = this.props.params.artid;
    if(urlName[1]=='Vote')
    {
      var VoteID = this.props.params.voteid;
      api.Vote(VoteID,ActID,ArtID,'isVoted').then((res) => {
        if (res.status == 0) {
          this.setState({
            isvoted:true,
          })
        }else
        {
          this.setState({
            isvoted:false,
          })
        }
        console.log(res);
      }, (err) => {
        console.log(err);
      })
  
      api.VoteNum(ArtID).then((res) => {
        this.setState({
          vote_votenum:res.num,
        })
        console.log(res);
      }, (err) => {
        console.log(err);
      })
    }
    

    api.ActInfo(ActID).then((res) => {
      if (res.status == 1) {
        this.setState({
          KVurl:'http://wechat.crnonline.org/'+res.data.info.head_img,
          loading:false,
        })
      } else {
        alert(res.message)
        this.setState({
          loading:false,
        })
      }
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
  vote()
  {
    var ActID = this.props.params.actid;
    var ArtID = this.props.params.artid;
    var VoteID = this.props.params.voteid;

    api.Vote(VoteID,ActID,ArtID,'vote').then((res) => {
      if (res.status == 1) {
        alert(res.data);
        this.setState({
          vote_votenum:parseInt(this.state.vote_votenum)+1,
          isvoted:true,
        })
      }else
      {
        alert(res.data)
      }
      console.log(res);
    }, (err) => {
      console.log(err);
    })
  }
  switchBtn()
  {
    switch (this.state.from) {
      case 'View':
          return this.state.PC&&this.state.showUploadBtn?<div className='Phone2Viewbtn' onClick={this.togleMask}>去提交</div>:'';
          break;
      case 'Vote':
          return (
          <div className='fixVote'>
                <div className={this.state.isvoted?'voted':'baseBtn_vote'} onClick={this.vote}>
                      <div className="Votedetial">
                          <span>{this.state.isvoted?'已投过票':'为TA投票'}</span><br />
                          <span><span>{this.state.vote_votenum}</span>票</span>
                      </div>
                </div>
          </div>)
          break;
    }
  }
  showUpload(show){
    this.setState({
      showUploadBtn:show,
    })
  }
  render() {
    return (
      <div className='ViewBox' style={this.state.PC?{width:'1024px'}:{}}>
        {this.state.loading?<div className='LoadingMask'>
          <CombLoading /></div>:''}
        {this.state.showMask?<MaskBase  ActID={this.props.params.actid} ArtID={this.props.params.artid} hidemask={this.togleMask}/>:''}
        <HeaderKV KVurl={this.state.KVurl}/>
        <ContentListBox artid={this.props.params.artid} showUpload={this.showUpload}/>
        {this.switchBtn()}
        <EndBanner/>
      </div>
    )
  }
}

export default View
