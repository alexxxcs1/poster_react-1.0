import React, { Component } from 'react'
import ListItem from './ListItem'

import { api } from 'common/app'

export class ListBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
        list:null,
    };
    this.createArticle = this.createArticle.bind(this);
  }
  createArticle()
  {
    var cont = this;
    var itemNodes = this.state.list.map(function(itemBase) {   
      return (
        <ListItem info={itemBase} ActID={cont.props.ActID}/>
      ); 
    });
    return itemNodes;
  }
  componentDidMount()
  {
    api.ArticleList(this.props.ActID).then((res) => {  
        this.setState(
            {
                list:res.data.list,
            });
        console.log(res);
      }, (err) => {
        console.log(err);
      })
  }
  render() {
    return (
      <div>
            {this.state.list?this.createArticle():null}
      </div>
    )
  }
}

export default ListBox
