import React, { Component } from 'react'
import './TextBox.scss'

export class TextBox extends Component {
  createArticle()
  {
    var cont = this;
    var itemNodes = this.props.content.map(function(itemBase) {   
      return (
        <li key={'textBoxli'+Math.random()*1024}>{itemBase}</li>
      ); 
    });
    return itemNodes;
  }
  render() {
    return (
      <div className='TextBox'>
        <div className='TextBoxTitle'>
            <span>
                {this.props.title}
            </span>
        </div>
        <div className='TextBoxContent'>
            <ul>
                {this.createArticle()}
            </ul>
        </div>
      </div>
    )
  }
}

export default TextBox
