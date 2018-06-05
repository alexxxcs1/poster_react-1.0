import React, { Component } from 'react'
import './ActList.scss'

import listTop from './img/listTop.png'
import ListBox from './components/ListBox'

export class List extends Component {
  componentDidMount()
  {
    
  }
  render() {
    return (
      <div className='ActListBox'>
        <div className='ListTop'>
            <img src={listTop} alt=""/>
        </div>
        <ListBox ActID={this.props.params.actid}/>
      </div>
    )
  }
}

export default List
