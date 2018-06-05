import React, { Component } from 'react'
import './scss/banner.scss'
import LoginBtn from './LoginBtn'
import SelectAct from './SelectActBtn'

export class LoginBanner extends Component {
  render() {
    return (
      <div className='LoginBanner' >
        {this.props.from == 'Login'?<LoginBtn attrLogin={this.props.attrLogin}/>:'' }
        <SelectAct attrLogin={this.props.attrLogin} from={this.props.from}/>
      </div>
    )
  }
}

export default LoginBanner
