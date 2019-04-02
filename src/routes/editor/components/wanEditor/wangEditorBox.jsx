import React, { Component } from 'react'
import PropTypes from 'prop-types';

import E from 'wangeditor'

// import E from 'wangeditor'

import './wanEditor.scss'

import { fileapi } from 'common/app/'

export class Wang extends Component {
  constructor(props, context) {
      super(props, context);
      this.state = {
        editorContent: ''
      }
    //   this.clearWord = this.clearWord.bind(this);
  }
  
  componentDidMount() {
    const elem = this.refs.textarea;
    const tooldbar = this.refs.toolbar;
    const editor = new E(elem)
    // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
    editor.customConfig.onchange = html => {
      this.setState({
        editorContent: html
      })
    }
    editor.customConfig.uploadImgServer = 'http://poster.crnonline.cn/baiduEdit/php/controller.php?action=uploadimage'
    editor.customConfig.uploadImgMaxSize = 2 * 1024 * 1024
    editor.customConfig.menus = [
        'image',
        'undo',  // 撤销
        'redo'  // 重复
    ];
    function clearWord(html){
        html=html.replace(/<o:p> <\/o:p>/g,""); 
        html=html.replace(/o:/g,""); 
        html=html.replace(/<font>/g,""); 
        html=html.replace(/<FONT>/g,""); 
        html=html.replace(/<span>/g,""); 
        html=html.replace(/<SPAN>/g,""); 
        html=html.replace(/<SPANlang=EN-US>/g,""); 
        html=html.replace(/<P>/g,""); 
        html=html.replace(/<\/P>/g,""); 
        html=html.replace(/<\/SPAN>/g,""); 
        parser=new DOMParser();
        return html;
      }
    editor.customConfig.pasteTextHandle = function (content) {
        // content 即粘贴过来的内容（html 或 纯文本），可进行自定义处理然后返回
        // var docSplitHtml = content.split('</html>');
        // if (docSplitHtml.length === 2) {
        //     content = docSplitHtml[0];
        // }
        // content = content.replace(/<[^>]+>/g,"");
         
        
        return content + '<p>在粘贴内容后面追加一行</p>'
    }
    editor.customConfig.uploadImgHooks = {
        before: function (xhr, editor, files) {
            // 图片上传之前触发
            // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件
            
            // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
            // return {
            //     prevent: true,
            //     msg: '放弃上传'
            // }
            
        },
        success: function (xhr, editor, result) {
            // 图片上传并返回结果，图片插入成功之后触发
            // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
        },
        fail: function (xhr, editor, result) {
            // 图片上传并返回结果，但图片插入错误时触发
            // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
        },
        error: function (xhr, editor) {
            // 图片上传出错时触发
            // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
        },
        timeout: function (xhr, editor) {
            // 图片上传超时时触发
            // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
        },
    
        // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
        // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
        customInsert: function (insertImg, result, editor) {
            // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
            // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
    
            // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
            var url = result.url
            insertImg('http://poster.crnonline.cn/'+url)
    
            // result 必须是一个 JSON 格式字符串！！！否则报错
        }
    };
    editor.create()
    
  }
  render() {
    return (
        <div>
            <div className='TextBox'>
                <div className='TextBoxTitle'>
                    <span>
                        {this.props.title}
                    </span>
                </div>

                <div ref='toolbar'></div>

                <div ref="textarea" className='TextArea'>

                </div>

                <input className='displayInput' ref='uploadImg' type='file' accept="image/png,image/gif"/>
                {/* onChange={this.uploadImg} */}

            </div>
        </div>

    )
  }
}

export default Wang
Wang.contextTypes = { store: PropTypes.object.isRequired }
