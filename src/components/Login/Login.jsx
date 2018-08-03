import React, { Component } from 'react'
import {saveUser} from '../../redux/actions/STATE';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { hashHistory, Router, Route } from 'react-router'
import Input from 'react-input-password'
import './Login.scss'
import { api } from 'common/app'
import baseLR_top from './imgs/baseLR_top.png';
import back from './imgs/back.png';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionList:null,
      phone:'',
      password:'',
      ActID:0,
    };
    this.Login2act = this.Login2act.bind(this);
    this.valueChange = this.valueChange.bind(this);
    this.Login2act = this.Login2act.bind(this);
  }
  componentDidMount()
  {
    const { store } = this.context;
    this.setState({
      ActID:store.getState().webState.ActID,
    })
  }
  Login2act(event)
  {
      if (this.state.phone&&this.state.password) {
        api.Login(this.state.phone,this.state.password,this.state.ActID).then((res) => {
          if (res.status==0) {
            alert(res.data.msg)
          }else
          {
            this.setState({
              loginUser:res.data,
            });
            const { store } = this.context;
  
            res.data.login = true;
            this.props.saveUser(res.data)
            var counter = store.getState();
            // this.props.attrLogin(false,'SelectAct');
            hashHistory.push('/User/'+this.state.ActID); //判断是否登录
          }
          console.log(res)
        }, (err) => {
          console.log(err)
        })
      } else {
        var tmp =[];
        switch (false) {
          case Boolean(this.state.phone):
            tmp.push('手机号');
          case Boolean(this.state.password):
            tmp.push('密码');
          default:
            break;
        }
        var str=''
        for (let z = 0; z < tmp.length; z++) {
          str += z==tmp.length-1?tmp[z]:tmp[z]+'、'; 
        }
        alert(str+'不可为空');
      }
      
  }
  valueChange(event)
  {
    switch (event.target.id) {
      case 'phone':
          event.target.value=event.target.value.replace(/[^0-9-]+/,'');
          if (event.target.value.length>11) {
            event.target.value = event.target.value.slice(0,11);
          }
          this.setState({phone:event.target.value});
          return;
      case 'password':
          event.target.value=event.target.value.replace(/[^0-9-]+/,'');
          if (event.target.value.length>6) {
            event.target.value = event.target.value.slice(0,6);
          }
          this.setState({password:event.target.value});
          return;
    }
  }
  render() {
    return (
        
      <div className='Login'>
            <div className='back' onClick={this.props.attrLogin} to='SelectAct'>
                    <img src={back} alt=""/>
                    返回会议列表
            </div>

            <div className='InputBakground'>
                  
                  <div className='InputBox'>
                      <img src={baseLR_top} alt="" className='loginbanner'/>
                      <div>
                          {/* <div className='InputName'>
                            <div>
                              手机号
                            </div>
                          </div>  */}
                          <div className='inputItem'>
                              <input type='text'id='phone' value={this.state.phone} placeholder='请输入您的手机号' onChange={this.valueChange}/>
                          </div>
                      </div>

                      <div>
                          {/* <div className='InputName'>
                            <div>
                              密 码asdasdASasdasdasdasd
                            </div>
                          </div>  */}
                          <div className='inputItem'>
                              <input type='password' id='password' value={this.state.password} placeholder='请输入您的密码' onChange={this.valueChange}/>
                          </div>
                      </div>

                      <div>
                          <div className='Login2Act' onClick={this.Login2act}>
                            立即登录
                          </div>
                      </div>

                  </div>
            </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
Login.contextTypes = { store: PropTypes.object.isRequired }

// export default Login
