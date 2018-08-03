import React, { Component } from 'react'
import './home.scss';
import bell from './imgs/bell.png';
import LoginBanner from '../../components/LoginBanner/Banner';
import MainKV from './components/MainKV'
import Login from '../../components/Login/Login'
import SelectAct from '../../components/SelectAct/SelectAct'

import {saveUser} from '../../redux/actions/STATE';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { api } from 'common/app'


export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageState:'Index',
      regTips:true,
    };
    this.changeState = this.changeState.bind(this);
    this.handleTips = this.handleTips.bind(this);
  }
  componentDidMount()
  {
    const { store } = this.context;
    
    var webState = store.getState().webState;
    // if(store.getState().webState.user_data)
    // {
    //   this.setState({pageState:'SelectAct'});
    // }else
    // {
    //   this.setState({pageState:'Index'});
    // };
    
  }
  changeState(event,to)
  {
    const { store } = this.context;
    
    if (event) {
      
      this.setState({pageState:event.target.getAttribute('to')});
    }else
    {
      this.setState({pageState:to});
      
    }
    
  }

  LocalRouter()
  {
      switch (this.state.pageState) {
        case 'Index':
          return <MainKV />;
          break;
        case 'Login':
          return <Login attrLogin={this.changeState}/>;
          break;
        case 'SelectAct':
          return <SelectAct changeState={this.changeState}/>;
          break;
      }
  }
  handleTips(boolean){
    this.setState({
      regTips:boolean
    })
  }
  render() {
    return (
      <div className='OutBox'>
      {this.state.regTips?<div className='regmask'>
          
          <div className='regtips'>
              <div className='regtipsTitpe'>
                <div className='regTitle'>
                  <img className='bell' src={bell} alt=""/>
                  <div className='regKnow'>
                    登录须知
                  </div>
                </div>
              </div>
              <div className='regTipsBox'></div>
              <ul className='tipsul'>
                  <li>您好！经专家审议，您的论文已被大会录用以壁报方式交流。</li>
                  <li>系统登陆时，请务必使用您向护理会议投稿时登记的手机号码和姓名，密码为手机号码后6位数字。</li>
                  <li>上传过程中有任何技术问题可咨询工作人员（电话：13501836580，工作时间9:00-18:00）。</li>
                  <li>特别提示：系统仅接收被录用论文修改的壁报，登陆前请确认您收到学会壁报交流通知。</li>
                  <li>&nbsp;</li>
                  <li>
                      <button className="CloseTips" onClick={this.handleTips.bind(this,false)}>我已知晓,去登录</button>
                  </li>
              </ul>
          </div>
        </div>:''}
        
        
        <LoginBanner attrLogin={this.changeState} ref='LoginBanner' from={this.state.pageState}/>
        {/* {this.props.children} */}
        {this.LocalRouter()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
      setUser: state.User
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
      saveUser: (data) => {
          dispatch(saveUser(data))
      },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
Home.contextTypes = { store: PropTypes.object.isRequired }
