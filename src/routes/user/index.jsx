import React, { Component } from 'react'
import { hashHistory, Router, Route } from 'react-router'
import PropTypes from 'prop-types';
import {selectAct} from '../../redux/actions/STATE';
import {connect} from 'react-redux';

import IsLoginBox from 'common/isLogin'

import './User.scss'

import HeaderKV from '../../components/HeaderKV/HeaderKV';
import TextLine from '../../components/TextLine/TextLine';
import LineInput from '../../components/LineInput/LineInput';
import MyArticleBox from '../../components/MyArticleBox/MyArticleBox'
import UserBanner from '../../components/TopUserBanner/UserBanner'

import { api } from 'common/app'

export class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      KVurl:'',
      User:null,
      ActID:this.props.params.actid,
    };
  }
  componentDidMount()
  {
    const { store } = this.context;
    var webState = store.getState().webState;
    var User  = webState.user_data;
    var ActID = this.props.params.actid;
    var BaseURL = webState.baseURL;

    this.props.selectAct(ActID);

    if (!ActID||!User) {
      // hashHistory.push('/'); //判断是否登录
    }else
    {
      this.setState({
        User : User
      })
    }
    api.ActInfo(ActID).then((res) => {
      this.setState({
        KVurl:BaseURL+res.data.info.cover_pic,
        ActID:ActID,
      })
      
      console.log(res);
    }, (err) => {
      console.log(err);
    })

  }
  render() {
    return (

        <div className='UserBox'>
            <IsLoginBox />
            <UserBanner />
            <HeaderKV KVurl={this.state.KVurl}/>

            <TextLine text='投稿人信息'/>
  
            <LineInput InputName='投稿人' InputContent={this.state.User?this.state.User.uname:null}/>
            <LineInput InputName='手机号码' InputContent={this.state.User?this.state.User.mobile:null}/>

            <TextLine text='我投过的稿件'/>

            <MyArticleBox ActID={this.state.ActID}/>

        </div>

    )
  }
}

const mapStateToProps = (state) => {  //将  redux的state 转化为prop属性
  return {
    ActID: state,
  }
};

const mapDispatchToProps = (dispatch) => { //将action的函数变成prop属性
  return {
      selectAct: (data) => {
          dispatch(selectAct(data))
      },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
// export default User
User.propTypes = {
  params: PropTypes.object.isRequired
}
User.contextTypes = { store: PropTypes.object.isRequired }

