import React, { Component } from 'react'

import './NewEditor.scss'

import 'braft-polyfill'
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/braft.css'

import { fileapi } from 'common/app/'

export class NewEditor extends Component {
  constructor(props)
  {
      super(props);
      this.state = {};
      this.handleChange = this.handleChange.bind(this);
      this.handleRawChange = this.handleRawChange.bind(this);
      this.uploadFile = this.uploadFile.bind(this);
  }
  handleChange = (content) => {
    this.props.changeContent(this.props.id,content);
  }

  handleRawChange = (rawContent) => {
  }

  uploadFile = (param) =>
  {

    const fd = new FormData()
    fd.append('file', param.file)
    fileapi.ImageLoad(fd).then((res) => {
        if (res.state == 'SUCCESS') {
          param.progress(100)
          param.success({
            url:'http://poster.crnonline.cn/' + res.url,
            meta: {
              // id: res.title,
              // title: res.title,
              // alt: res.title,
              // poster: 'http://poster.crnonline.cn/' + res.url, // 指定视频播放器的封面
            }
          })

        }else
        {
          param.error({
            msg: res.state
          })
        }
        // console.log(res);
      }, (err) => {
        param.error({
            msg: '上传失败，请检查文件大小'
        })
    });  
  }
  render() {
    const editorProps = {
        height: 200,
        contentFormat: 'html',
        initialContent: this.props.oldContent?this.props.oldContent:'',
        onChange: this.handleChange,
        onRawChange: this.handleRawChange,
        pasteMode:'text',
        controls:['media'],
        placeholder:'请在这里输入内容',
        media:{
          allowPasteImage: false, // 是否允许直接粘贴剪贴板图片（例如QQ截图等）到编辑器
          image: true, // 开启图片插入功能
          uploadFn:this.uploadFile,
          video: false, // 开启视频插入功能
          audio: false, // 开启音频插入功能
          embed: false,
          // validateFn: null, // 指定本地校验函数，说明见下文
          // uploadFn: null, // 指定上传函数，说明见下文
          // removeConfirmFn: null, // 指定删除前的确认函数，说明见下文
          // onRemove: null, // 指定媒体库文件被删除时的回调，参数为被删除的媒体文件列表(数组)
          // onChange: null, // 指定媒体库文件列表发生变化时的回调，参数为媒体库文件列表(数组)
          // onInsert: null, // 指定从媒体库插入文件到编辑器时的回调，参数为被插入的媒体文件列表(数组)
        }
      }
    return (
      <div className='TextBox'>
      <div className='TextBoxTitle'>
          <span>
              {this.props.title}
          </span>
      </div>

        <BraftEditor {...editorProps}/>

      </div>
    )
  }
}

export default NewEditor
