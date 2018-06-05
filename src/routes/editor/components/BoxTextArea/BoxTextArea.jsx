import React, { Component } from 'react'
import './BoxTextArea.scss'

import Quill from 'quill';  
import 'quill/dist/quill.snow.css';  

import PropTypes from 'prop-types';

import { fileapi } from 'common/app/'

export class BoxTextArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value:this.props.oldContent,
    };
    var value = this.props.oldContent;
    this.setState({value})
    
    this.uploadImg = this.uploadImg.bind(this);
  }
  componentDidMount()
  {
    const textbox = this.refs.textarea;  
    const toolbarOptions = [  
      // ['bold', 'italic', 'underline', 'strike'],        // toggled buttons  
      // ['blockquote', 'code-block'],  

      // [{ 'header': 1 }, { 'header': 2 }],               // custom button values  
      // [{ 'list': 'ordered'}, { 'list': 'bullet' }],  
      // [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript  
      // [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent  
      // [{ 'direction': 'rtl' }],                         // text direction  

      // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown  
      // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],  

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme  
      [{ 'font': [] }],  
      [{ 'align': [] }],  
      ['image'],  
      ['clean']                                         // remove formatting button  
    ];  
    const options = {  
      debug: 'warn',  
      modules: {  
          toolbar: toolbarOptions  
      },  
      placeholder: '请输入文本...',  
      readOnly: false,  
      theme: 'snow'  
    };
    const editor =this.editor= new Quill(textbox,options);  
    const {value}=this.state;  
    
    editor.clipboard.addMatcher(Node.TEXT_NODE, function(node, delta) {
      
      return delta.compose(new Delta().retain(delta.length(), { bold: true }));
    });

    if (value) editor.clipboard.dangerouslyPasteHTML(value);  
    
    editor.on('text-change', this.handleChange.bind(this));    

    const toolbar = editor.theme.modules.toolbar;
    toolbar.addHandler('image',()=>{
        this.refs.uploadImg.click();
    })
  }
  handleChange () {  
    var reg = /style\s*?=\s*?([‘"])[\s\S]*?\1/g;

    // this.editor.root.innerHTML = this.editor.root.innerHTML.replace(reg ,''); //清除所有style ,但是会导致quill编辑器的按钮无法控制文字
    let {value}=this.state;  
    
    value = this.editor.root.innerHTML;
    this.setState({value});  
    this.props.changeContent(this.props.id,this.state.value)
  }  

  uploadImg()
  {
    const { store } = this.context;
    var webState = store.getState().webState;

    var formData = new FormData();
    formData.append('file',this.refs.uploadImg.files[0]);
    
    fileapi.ImageLoad(formData).then((res) => {
      if (res.state == 'SUCCESS') {
        this.editor.insertEmbed(10, 'image',webState.baseURL + res.url);
        this.refs.uploadImg.files[0] = null;
      }
      // console.log(res);
    }, (err) => {
      console.log(err);
    })

  }
  render() {
    return (
      <div className='TextBox'>
        <div className='TextBoxTitle'>
            <span>
                {this.props.title}
            </span>
        </div>

        <div ref="textarea">

        </div>
        
        <input className='displayInput' ref='uploadImg' type='file' accept="image/png,image/gif" onChange={this.uploadImg}/>

      </div>
    )
  }
}

export default BoxTextArea
BoxTextArea.contextTypes = { store: PropTypes.object.isRequired }
