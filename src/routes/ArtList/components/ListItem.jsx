import React, { Component } from 'react'
import { Link } from 'react-router'

import './ListItem.scss'

export class List extends Component {
  componentDidMount()
  {
    
  }
  render() {
    return (
      <div className='ListItem'>
        <Link to={'/Vote/'+this.props.ActID + '/' + this.props.info.id}>
        <div className='ItemTitle'>
          {this.props.info.title}
        </div>
        <div className='ItemAuthor'>
          作者：{this.props.info.author}
        </div>
        </Link>
        <hr/>
      </div>
    )
  }
}

export default List
