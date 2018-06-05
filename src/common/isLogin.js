
import React, { Component } from 'react'
import { api,ua } from 'common/app'
import { hashHistory, Router, Route } from 'react-router'

import {saveUser} from '../redux/actions/STATE';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

export class IsLoginBox extends Component {
  componentDidMount()
  {
    api.isLogin().then((res) => {
      
        if (res.status==1) {
          const { store } = this.context;
          res.data.login = true;
          this.props.saveUser(res.data);
          this.setState({
            login:true,
          })
          // var counter = store.getState().counter;
          // this.setState({pageState:'SelectAct'});
          
        }else
        {
          const { store } = this.context;
          res.data.login = false;
          this.props.saveUser(null);
          
          this.setState({
            login:false,
          })
          var urlName = location.hash.split("/");
          if (urlName[1]=='View'||urlName[1]=='List'||urlName[1]=='Vote'){
            
          }else{
            hashHistory.push('/'); //判断是否登录
          }
        }
        console.log(res);
      }, (err) => {
        console.log(err);
      })
  }
  render() {
    return (
      <div>
        
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
        setUser: state
    }
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
        saveUser: (data) => {
            dispatch(saveUser(data))
        },
    }
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(IsLoginBox);
  IsLoginBox.contextTypes = { store: PropTypes.object.isRequired }
