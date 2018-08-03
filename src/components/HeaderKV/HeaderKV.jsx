import React, { Component } from 'react'
import './HeaderKV.scss'

export class HeaderKV extends Component {
  constructor(props){
    super(props);
    this.state = {
      url:null,
    }
  }
  componentWillReceiveProps(nextprops){
    this.setState({
      url:nextprops.KVurl
    })
  }
  componentDidMount(){
    this.setState({
      url:this.props.KVurl
    })
  }
  render() {
    return (
      <div className='KVbox'>
        <img src={this.state.url} alt=""/>
      </div>
    )
  }
}

export default HeaderKV
