import React, { Component } from 'react'
import ViewTextBox from './components/ViewTextBox'
import ViewBoxInfo from './components/ViewBoxInfo'


import './ListBox.scss'

import { api } from 'common/app'

export class ContentListBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
        title:null,
        author:null,
        company:null,
        add_user:null,
        user_phone:null,
        goal:null,
        month:null,
        over:null,
        verdict:null,
        contents:null,
    };
  }
  componentDidMount()
  {
    api.articleInfo(this.props.artid).then((res) => {
        this.setState({
          title:res.data.info.title,
          author:res.data.info.author,
          company:res.data.info.company,
          add_user:res.data.info.add_user,
          user_phone:res.data.info.user_phone,
          goal:res.data.info.goal,
          month:res.data.info.month,
          over:res.data.info.over,
          verdict:res.data.info.verdict,
          contents:res.data.info.contents,
        })
        console.log(res);
      }, (err) => {
        console.log(err);
      });
  }
  render() {
    return (
      <div className='ListBox'>
        <ViewBoxInfo rendContent={this.state.title} fontStyle='title' title=''/>
        <ViewBoxInfo rendContent={this.state.author} title='作者：' />
        <ViewBoxInfo rendContent={this.state.company} title='所在工作单位/机构：' />
        <ViewTextBox rendContent={this.state.goal} title='目的' />
        <ViewTextBox rendContent={this.state.month} title='方法' />
        <ViewTextBox rendContent={this.state.over} title='结果' />
        <ViewTextBox rendContent={this.state.verdict} title='结论' />
      </div>
    )
  }
}

export default ContentListBox
