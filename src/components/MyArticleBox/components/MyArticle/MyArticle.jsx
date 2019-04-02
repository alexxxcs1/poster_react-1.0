import React, { Component } from 'react'
import './MyArticle.scss'
import status0 from './imgs/status0.png'
import status1 from './imgs/status1.png'
import status2 from './imgs/status2.png'
import status3 from './imgs/status3.png'
import { Link } from 'react-router'

export class MyArticle extends Component {
  constructor(props) {
    super(props);
    this.switchStatus = this.switchStatus.bind(this);
  }
  componentDidMount()
  {
    
  }
  switchStatus()
  {
    switch (this.props.info.status) {
      case 'save':
        return <img src={status0} alt=""/>;
        break;
      case 'pending':
        return <img src={status1} alt=""/>;
        break;
      case 'success':
        return <img src={status2} alt=""/>;
        break;
      case 'fail':
        return <img src={status3} alt=""/>;
        break;
    }
  }
  render() {
    return (
      <div className='MyArticle'>
            {this.props.info.status == 'save'?<Link to={'/Editor/'+this.props.info.pid+'/'+this.props.info.id}>
              <div className='EditBtn' >
                  编辑
              </div>
            </Link>:(this.props.info.status == 'success'?<a target="_blank" href={'http://poster.crnonline.cn/index.php/api/poster/certificate?id='+this.props.info.id}>
              <div className='DownloadButton' >
                  下载证书
              </div>
            </a>:'')}

            <div className='infoBox'>
                <ul>
                    <li className='addTime'>投稿时间：{this.props.info.create_time}</li>
                    {this.props.info.status != 'save'?<Link to={'/View/'+this.props.info.pid+'/'+this.props.info.id}><li className='Title'>{this.props.info.title}</li></Link>:<li className='Title'>{this.props.info.title}</li>}
                    <li className='addPerson'>{this.props.info.author}|{this.props.info.company}</li>
                </ul>
            </div>
            <div className='statusBox'>
              {this.switchStatus()}
            </div>
      </div>
    )
  }
}

export default MyArticle
