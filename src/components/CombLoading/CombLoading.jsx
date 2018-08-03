import React, { Component } from 'react'
import style from './CombLoading.scss';

export class CombLoding extends Component {
  constructor(props){
    super(props);
    this.state = {
      color:'#ffffff',
    };
  }
  componentDidMount(){
    const color_1 = (parseInt(Math.random()*255,10).toString(16));
    const color_2 = (parseInt(Math.random()*255,10).toString(16));
    const color_3 = (parseInt(Math.random()*255,10).toString(16)); 
    const randomcolor = '#'+(color_1.length==2?color_1:color_1+'0')+(color_2.length==2?color_2:color_2+'0')+(color_3.length==2?color_3:color_3+'0');
    this.setState({
      color:randomcolor
    })
    console.log(randomcolor);
  }
  render() {
    return (
      <div className='CombLodingBox'>
        <div>
          <div className='coulm_2 coulm'>
            <div className='sharp' style={{'--randomcolor':this.state.color}}></div>
            <div className='sharp' style={{'--randomcolor':this.state.color}}></div>
          </div>
          <div className='coulm_3 coulm'>
            <div className='sharp' style={{'--randomcolor':this.state.color}}></div>
            <div className='sharp' style={{'--randomcolor':this.state.color}}></div>
            <div className='sharp' style={{'--randomcolor':this.state.color}}></div>
          </div>
          <div className='coulm_2 coulm'>
            <div className='sharp' style={{'--randomcolor':this.state.color}}></div>
            <div className='sharp' style={{'--randomcolor':this.state.color}}></div>
          </div>
        </div>
        <div className='circle' style={{'--randomcolor':this.state.color}}></div>        
        <div className='sharp' style={{'--randomcolor':this.state.color}}></div>
        <div className='sharp' style={{'--randomcolor':this.state.color}}></div>
        <div className='sharp' style={{'--randomcolor':this.state.color}}></div>

      </div>
    )
  }
}

export default CombLoding
