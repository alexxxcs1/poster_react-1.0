import React, { Component } from 'react'
import './UserBanner.scss'
import { api } from 'common/app'
import { hashHistory, Router, Route } from 'react-router'
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Provider} from 'react-redux';

import {saveUser,selectAct} from '../../redux/actions/STATE';


import contactQR from './imgs/contactQR.png'

export class UserBanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
       ConectUs:false,
    };
    this.showQR = this.showQR.bind(this);
    this.LogOut = this.LogOut.bind(this);
  }

  componentWillMount()
  {
    const { store } = this.context;
  }
  showQR()
  {
      this.setState({
        ConectUs:!this.state.ConectUs
      });
  }
  LogOut()
  {
    api.loginOut().then((res) => {
        if(res.status == 1)
        {
            const { store } = this.context;
            this.props.saveUser(null);
            this.props.selectAct(null);
            hashHistory.push('/'); //判断是否登录
        }
      }, (err) => {
        console.log(err);
      })
  }
  render() {
    return (
      <div className='UserBanner'>
        <div className='Logo'>
            Poster壁报系统
        </div>
        <div className='ConectUs' onClick={this.showQR}>
            点我联系客服
            {this.state.ConectUs?<div className='QR'>
                <img src={contactQR} alt=""/>
            </div>:''}
        </div>
        <div className='LogOut' onClick={this.LogOut}>
            退出当前用户
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
    return {
        setUser: state
    }
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        saveUser: (data) => {
            dispatch(saveUser(data))
        },
        selectAct: (data) => {
            dispatch(selectAct(data))
        },
    }
  };

export default connect(mapStateToProps, mapDispatchToProps)(UserBanner);
UserBanner.contextTypes = { store: PropTypes.object.isRequired }
// export default UserBanner
