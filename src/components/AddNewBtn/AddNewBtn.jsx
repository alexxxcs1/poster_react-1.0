import React, { Component } from 'react'
import { Link } from 'react-router'
import './AddNewBtn.scss'

export class AddNewBtn extends Component {
  render() {
    return (
      <Link to={this.props.to}>
        <div className='AddNewBtn'>
            <div> ＋ <span>{this.props.text}</span></div>
        </div>
      </Link>
    )
  }
}

export default AddNewBtn
