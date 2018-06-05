import React, { Component } from 'react'
import './QuillEditor.scss'
import PropTypes from 'prop-types';

import ReactQuill, { Quill, Mixin, Toolbar } from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6


import { fileapi } from 'common/app/'

export class QuillEditor extends Component {
    constructor(props) {
      super(props)
      this.state = { text: this.props.oldContent } // You can also pass a Quill Delta here
      this.handleChange = this.handleChange.bind(this)
      this.uploadImg = this.uploadImg.bind(this);
    }
    componentDidMount()
    {
        var toolbar = this.refs.Quill.editor.theme.modules.toolbar;
        
        toolbar.addHandler('image',()=>{
            this.refs.uploadImg.click();  
        })     
    }
    uploadImg()
    {
      const { store } = this.context;
      var webState = store.getState().webState;
  
      var formData = new FormData();
      formData.append('file',this.refs.uploadImg.files[0]);
      
      fileapi.ImageLoad(formData).then((res) => {
        if (res.state == 'SUCCESS') {
          this.refs.Quill.editor.insertEmbed(10, 'image',webState.baseURL + res.url);
          this.refs.uploadImg.files[0] = null;
        }
        // console.log(res);
      }, (err) => {
        console.log(err);
      })
  
    }
    handleChange(value) {
      var reg = /style\s*?=\s*?([‘"])[\s\S]*?\1/g;  //清除style样式
      value = value.replace(reg ,'');
      this.setState({ text: value });
      this.props.changeContent(this.props.id,this.state.text);

    }

    render() {
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
      
            // [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme  
            // [{ 'font': [] }],  
            // [{ 'align': [] }],  
            ['image'],  
            ['clean']                                         // remove formatting button  
          ];  
        const options = {  
            debug: 'warn',  
            modules: {  
                toolbar: toolbarOptions  
            },  
            readOnly: false,  
            theme: 'snow'  
          };
        return (
            <div className='TextBox'>
                <div className='TextBoxTitle'>
                    <span>
                        {this.props.title}
                    </span>
                </div>

                <ReactQuill value={this.state.text} onChange={this.handleChange} modules={options.modules} ref='Quill'/>

                <input className='displayInput' ref='uploadImg' type='file' accept="image/png,image/gif" onChange={this.uploadImg}/>

            </div>
        )
    }
}

export default QuillEditor
QuillEditor.contextTypes = { store: PropTypes.object.isRequired }