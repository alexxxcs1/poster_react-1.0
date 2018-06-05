import React, { Component } from 'react'
import './scss/banner.scss'
import PropTypes from 'prop-types';
import { Link } from 'react-router'

export class LoginBtn extends Component {
  componentDidMount() {
    const { store } = this.context;

  }
  constructor(props) {
    super(props);
  }
  switchLogin()
  {
    // const { store } = this.context;
    // if (store.getState().webState.user_data) {
    //     return 'unActLoginBtn';
    // }else
    // {
      return 'LoginBtn';
    // }
  }
  switchTo()
  {
      // const { store } = this.context;
      // if (store.getState().webState.user_data) {
      //     return 'SelectAct';
      // }else
      // {
        return 'Login';
      // }
  }
  switchText()
  {
      // const { store } = this.context;
      // if (store.getState().webState.user_data) {
      //     return '已登录';
      // }else
      // {
        return '登录';
      // }
  }
  render() {
    return (
        <div className={this.switchLogin()} onClick={this.props.attrLogin} to={this.switchTo()}>
                {this.switchText()}
        </div>
    )
  }
}

LoginBtn.contextTypes = { store: PropTypes.object.isRequired }
export default LoginBtn
