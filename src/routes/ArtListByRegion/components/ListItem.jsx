import React, { Component } from 'react'
import { Link } from 'react-router'

import './ListItem.scss'

export class List extends Component {
  constructor(props){
    super(props);
    this.state={
      actid:null,
      voteid:null,
    }
  }
  componentWillReceiveProps(nextprops){
    this.refreshProps(nextprops)
  }
  componentDidMount()
  { 
    this.refreshProps(this.props)
  }
  refreshProps(props){
    this.setState({
      actid:props.ActID,
      voteid:props.voteid,
    })
  }
  render() {
    return (
      <div className='ListItem'>
        <Link to={this.state.voteid?'/Vote/'+this.state.actid + '/' + this.props.info.id + '/' + this.state.voteid:'/View/'+this.state.actid + '/' + this.props.info.id}>
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
