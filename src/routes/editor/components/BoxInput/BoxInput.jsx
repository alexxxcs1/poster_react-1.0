import React, { Component } from 'react'
import './BoxInput.scss'

export class BoxInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value:null,
    };
    this.changeValue = this.changeValue.bind(this);
  }
  componentDidMount()
  {
    this.setState({
      value:this.props.oldContent,
    })
  }
  changeValue(event)
  {
    this.setState({
      value:event.target.value,
    });
    
    this.props.changeContent(this.props.id,this.state.value)
    
  }
  render() {
    return (
      <div className='TextBox'>
        <div className='TextBoxTitle'>
            <span>
                {this.props.title}
            </span>
        </div>
        <div className='TextInput'>
            <input type="text" autoComplete="off" id={this.props.id} defaultValue={this.props.oldContent} onKeyUp={this.changeValue} onBlur={this.changeValue}/>
        </div>
        {/* <div className='TextBoxContent'>
            <ul>
                {this.createArticle()}
            </ul>
        </div> */}
      </div>
    )
  }
}

export default BoxInput
