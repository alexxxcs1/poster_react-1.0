import React, { Component } from 'react';
import ActBox from './components/ActBox';
import './scss/SelectAct.scss'
import { api } from 'common/app'



export class SelectAct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ActList:null,
      loaded:false,
    };

    this.createActBox = this.createActBox.bind(this);

  }
  componentDidMount()
  {
    
    api.getActList().then((res) => {
      if (res.status==1) {
        this.setState({
          ActList:res.data.info,
          loaded:true,
          SelectedAct:false,
        })
      }
      console.log(res)
    }, (err) => {
      console.log(err)
    })
  }

  createActBox()
  {
    // var count= this.state;
    var cont = this;
    
    var itemNodes = this.state.ActList.map(function(itemBase) {
      
      return (
        <ActBox imgUrl={'http://wechat.crnonline.org/'+itemBase.cover_pic} id={itemBase.id} changeState={cont.props.changeState} key={'SelectActBox'+Math.random()*1024}/>
      ); 
    });
    return itemNodes;
  }
  render() {
    
    return (
      <div className='SelectActBox'>
         <div className='welcomeText'>
         欢迎进入Poster壁报系统，请点选您要投稿的会议
         </div>

         {this.state.loaded?this.createActBox():<div>加载中</div>}

      </div>
    )
  }
};

export default SelectAct;
