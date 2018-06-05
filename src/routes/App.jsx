import React from 'react'
import { hashHistory, Router, Route } from 'react-router'

import {saveUser} from '../redux/actions/STATE';

import { api } from 'common/app'
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {Provider} from 'react-redux';
import store from '../redux/store';
import Home from './home'
import User from './User'
import Editor from './editor'
import View from './view&vote'
import List from './ArtList'
import NotFound from './notFound'

// import 'common/flexible'
import FastClick from 'fastclick'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login:false,
    };
  }
  componentDidMount () {
    // 初始化快速点击
    if ('addEventListener' in document) {
      document.addEventListener('DOMContentLoaded', function () {
        FastClick.attach(document.body)
      }, false)
    }
      
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



  shouldComponentUpdate () {
    return false
  }

  render () {
    return (
        <Router history={hashHistory} basename="/product/dist">
          {/* 首页 */}
          <Route path='/' component={Home} > 
            {/* <Route path="/login" component={Login}/> */}
          </Route>

          <Route path='/User/:actid' component={User} > 
            {/* <Route path="/login" component={Login}/> */}
          </Route>

          <Route path='/Editor/:actid/:editArt' component={Editor} > 
            {/* <Route path="/login" component={Login}/> */}
          </Route>

          <Route path='/View/:actid/:artid' component={View} > 
            {/* <Route path="/login" component={Login}/> */}
          </Route>
          <Route path='/Vote/:actid/:artid/:voteid' component={View} > 
            {/* <Route path="/login" component={Login}/> */}
          </Route>

          <Route path='/List/:actid' component={List} > 
            {/* <Route path="/login" component={Login}/> */}
          </Route>

          {/* 404页面 */}
          <Route path="*" component={NotFound}/> 

        </Router>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
App.contextTypes = { store: PropTypes.object.isRequired }
// export default App

