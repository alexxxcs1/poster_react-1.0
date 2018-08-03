import React, { Component } from 'react'
import './editor.scss'
import PropTypes from 'prop-types';
import { hashHistory, Router, Route } from 'react-router'

import IsLoginBox from 'common/isLogin'

import HeaderKV from '../../components/HeaderKV/HeaderKV';
import UserBanner from '../../components/TopUserBanner/UserBanner';
import CombLoading from '../../components/CombLoading';

import Steep0 from './steep/steep0';
import Steep1 from './steep/steep1';


import Steep2 from './steep/steep2';

import { api } from 'common/app'

export class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      KVurl:'',
      steep:0,
      title:null,
      author:null,
      company:null,
      add_user:null,
      user_phone:null,
      goal:null,
      month:null,
      over:null,
      verdict:null,
      contents:null,
      pid:null,
      id:null,

      loading:false,
    };
    this.changeSteep = this.changeSteep.bind(this);
    this.changeContent = this.changeContent.bind(this);
  }
  componentDidMount()
  {
    const { store } = this.context;
    var webState = store.getState().webState;
    var User  = webState.user_data
    var ActID = this.props.params.actid;
    var EditArt = this.props.params.editArt;
    

    // console.log(typeof(parseInt(EditArt)),parseInt(EditArt));
    
    if (!isNaN(parseInt(EditArt))) {
      this.setState({
        pid:ActID,
        id:EditArt,
        add_user:User?User.uname:'',
        user_phone:User?User.mobile:'',
        loading:true,
      });
      api.articleInfo(EditArt).then((res) => {
        if (res.status==1) {
          this.setState({
            EditArtData:res.data.info,
            title:res.data.info.title,
            author:res.data.info.author,
            company:res.data.info.company,
            add_user:res.data.info.add_user,
            user_phone:res.data.info.user_phone,
            goal:res.data.info.goal,
            month:res.data.info.month,
            over:res.data.info.over,
            verdict:res.data.info.verdict,
            contents:res.data.info.contents,
            loading:false,
          })
        } else {
          alert(res.message);
                          // hashHistory.push('/'); //判断是否登录
          this.setState({
            loading:false,
           })
        }
        
        console.log(res);
      }, (err) => {
        console.log(err);
      });
    }else
    {
      if (User) {
        this.setState({
        pid:ActID,
        add_user:User.uname?User.uname:'',
        user_phone:User.mobile?User.mobile:'',
        loading:false,
        });
      }
      
    }
    var BaseURL = webState.baseURL;
    
    api.ActInfo(ActID/*固定59 测试*/).then((res) => {
      this.setState({
        KVurl:BaseURL+res.data.info.cover_pic,
      })
      console.log(res);
    }, (err) => {
      console.log(err);
    })

  };
  changeSteep(event,to)
  {
    switch (event.target.getAttribute('to')) {
      case 'back':
        if (this.state.steep>0) {
          this.setState({
            steep:this.state.steep-1,
          })
        }else
        {
          //跳回用户页
          hashHistory.push('/User/'+this.props.params.actid); //判断是否登录
        }
        break;
      case 'next':
        //判断数据是否为空
        switch (this.state.steep) {
          case 0:
              this.setState({
                  steep: this.state.steep + 1,
              })
              break;
          case 1:
              if (this.state.title&&this.state.author&&this.state.company) {//判断是否为空
                //提交数据
                api.SaveArt({title:this.state.title,author:this.state.author,company:this.state.company,goal:this.state.goal,month:this.state.month,over:this.state.over,verdict:this.state.verdict,add_user:this.state.add_user,user_phone:this.state.user_phone,id:this.state.id,pid:this.state.pid,}).then((res) => {
                  if (res.status==1) {
                    //返回的id存入state
                    this.setState({
                      id:res.data.id,
                    })
                  }else
                  {
                    // alert('未登录');
                    // hashHistory.push('/'); //判断是否登录
                  }
                                  //跳转页面
                  this.setState({
                    steep: this.state.steep + 1,
                  })
                  console.log(res)
                }, (err) => {
                  console.log(err)
                })
              }else
              {
                var tmp=[];
                
                switch (false) {
                  case Boolean(this.state.title):
                    tmp.push('标题');
                  case Boolean(this.state.author):
                    tmp.push('作者');
                  case Boolean(this.state.company):
                    tmp.push('工作单位');
                }
                var str = '';
                for (var z = 0; z < tmp.length; z++) {
                  str += (z == tmp.length-1)?tmp[z]:tmp[z]+'、';
                }
                alert(str + '不能为空')
              }
              
              break;
          case 2:
              if (this.state.title && this.state.author && this.state.company && this.state.goal && this.state.month && this.state.over && this.state.verdict) { //判断是否为空
                  var length = (this.state.goal + this.state.month + this.state.over + this.state.verdict).replace(/<[^>]+>/g,"").length;
                  if (length<300) {
                    alert('内容不低于300个字，当前还差'+(300-length)+'字')
                  }else if(length>1200){
                    alert('内容不多于1200个字，当前已超出'+Math.abs(1200-length)+'字')
                  }else{
                      this.setState({
                        loading:true,
                      })
                      //提交数据
                      api.SaveArt({title:this.state.title,author:this.state.author,company:this.state.company,goal:this.state.goal,month:this.state.month,over:this.state.over,verdict:this.state.verdict,add_user:this.state.add_user,user_phone:this.state.user_phone,pid:this.state.pid,id:this.state.id}).then((res) => {
                        if (res.status==1) {
                          //返回的id存入state
                          this.setState({
                            id:res.data.id,
                          })
                          this.setState({
                            loading:false,
                          })
                          //跳转页面
                          hashHistory.push('/View/'+this.props.params.actid+'/'+this.state.id);
                        }else
                        {
                          alert(res.message);
                          // hashHistory.push('/'); //判断是否登录
                          this.setState({
                            loading:false,
                          })
                        }
                        console.log(res)
                      }, (err) => {
                        console.log(err)
                      })
                      
                  }
                  
              }else {
                  alert('信息不能为空！');
              }
              
              break;
        }
        //提交数据

        //跳转下一页
        // if (this.state.steep<2) {
        //   this.setState({
        //     steep:this.state.steep+1,
        //   })
        // }
        break;
    }
    // if (event) {
    //   console.log(event);
      
    //   // console.log(event.target.getAttribute('to'));
    //   this.setState({steep:event.target.getAttribute('to')});
    // }else
    // {
    //   this.setState({steep:to});
    //   // console.log('no event');
      
    // }
  }
            // title:null,
          // author:null,
          // company:null,
          // add_user:null,
          // user_phone:null,
          // goal:null,
          // month:null,
          // over:null,
          // verdict:null,
          // contents:null,
  changeContent(id,value)
  {
    console.log(id,value);
    
      switch (id) {
        case 'title':
            this.setState({
              title:value,
            })
            break;
        case 'author':
            this.setState({
              author:value,
            })
            break;
        case 'company':
            this.setState({
              company:value,
            })
            break;
        case 'add_user':
            this.setState({
              add_user:value,
            })
            break;
        case 'user_phone':
            this.setState({
              user_phone:value,
            })
            break;
        case 'goal':
            this.setState({
              goal:value,
            })
            break;
        case 'month':
            this.setState({
              month:value,
            })
            break;
        case 'over':
            this.setState({
              over:value,
            })
            break;
        case 'verdict':
            this.setState({
              verdict:value,
            })
            break;
      }
  }
  switchSteep()
  {
    switch (this.state.steep) {
      case 0:
        return <Steep0 changeSteep={this.changeSteep}/>
        break;
      case 1:
          return <Steep1 changeContent={this.changeContent} changeSteep={this.changeSteep} oldContent={this.state}/>       
        break;
      case 2:
          return <Steep2 changeContent={this.changeContent} changeSteep={this.changeSteep} oldContent={this.state}/>
        break;
    }
  }
  render() {
    return (
      <div className='EditorBox'>
        {this.state.loading?<div className='LoadingMask'>
          <CombLoading /></div>:''}
        
          
          {/* <IsLoginBox /> */}
          
          <UserBanner />
          <div className='spcKVBox'><HeaderKV KVurl={this.state.KVurl}/></div>
          {this.switchSteep()}
      </div>
    )
  }
}

export default Editor
Editor.propTypes = {
  params: PropTypes.object.isRequired
}
Editor.contextTypes = { store: PropTypes.object.isRequired }
