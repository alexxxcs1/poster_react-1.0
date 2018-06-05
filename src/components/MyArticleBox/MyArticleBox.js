import React, { Component } from 'react'
import './MyArticleBox.scss'
import { api } from 'common/app'

import MyArticle from './components/MyArticle/MyArticle';
import AddNewBtn from '../AddNewBtn/AddNewBtn'

export class MyArticleBox extends Component {
   constructor(props) {
        super(props);
        this.state = {
          myArt:null,
          canAdd:false,
          ActID:null,
        };
        this.createArticle = this.createArticle.bind(this);
    }
  componentWillReceiveProps(nextProps)  //当props更新时调用 nextProps就是更新后的props
  {
    // var ActID = this.props.params.actid;


      
  }
  componentDidMount(){  //初始化组件时调用，当prop更新时不会调用，所以传来的props都是初始值

    if (this.props.ActID!=null) {
      api.myAarticle(this.props.ActID).then((res) => {
        
        if (res.data.list==null) {
          this.setState({
            canAdd:true,
          })
        }else
        {
          this.setState({
            canAdd:false,
          })
        }
        this.setState({
          myArt:res.data.list,
        })

      }, (err) => {
        console.log(err)
      })
    }
    
  }
  createArticle()
  {
    var cont = this;
    var itemNodes = this.state.myArt.map(function(itemBase) {   
      return (
        <MyArticle info={itemBase} />
      ); 
    });
    return itemNodes;
  }
  render() {
    var info = {
        create_time:'2018-04-20 16:23:42',
        title:'智障吗！',
        author:'智障',
        company:'中华护理学会全国肿瘤护理新进展研讨会'
      };
    return (
      <div className='MyArticleBox'>
            {this.state.canAdd?<AddNewBtn text='新增稿件' to={'/Editor/'+this.props.ActID+'/add'}/>:null}
            {/* <AddNewBtn text='新增稿件'/> */}
            {/* <MyArticle info={info}/> */}
            {this.state.myArt?this.createArticle():null}
      </div>
    )
  }
}
export default MyArticleBox
