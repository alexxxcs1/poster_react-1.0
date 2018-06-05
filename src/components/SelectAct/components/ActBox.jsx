import React, { Component } from 'react'
import {selectAct} from '../../../redux/actions/STATE';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Link } from 'react-router'
import './ActBox.scss'

export class ActBox extends Component {
  constructor(props) {
    super(props);
    this.SetAct = this.SetAct.bind(this);
  }
  SetAct()
  {
    this.props.changeState(false,'Login');
    const { store } = this.context;
    this.props.selectAct(this.props.id);
  }
  render() {
    return (
      
      <div className='ActBox'  onClick={this.SetAct}>
          {/* <Link to={'/User/'+this.props.id}> */}
            <img src={this.props.imgUrl} alt=""/>
          {/* </Link> */}
      </div>
    )
  }
}

const mapStateToProps = (state) => {  //将  redux的state 转化为prop属性
  return {
    ActID: state,
  }
};

const mapDispatchToProps = (dispatch) => { //将action的函数变成prop属性
  return {
      selectAct: (data) => {
          dispatch(selectAct(data))
      },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ActBox);
ActBox.contextTypes = { store: PropTypes.object.isRequired }
// export default ActBox
