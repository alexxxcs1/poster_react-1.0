import React, { Component } from 'react'
import './home.scss';
import LoginBanner from '../../components/LoginBanner/Banner';
import MainKV from './components/MainKV'
import Login from '../../components/Login/Login'
import SelectAct from '../../components/SelectAct/SelectAct'

import {saveUser} from '../../redux/actions/STATE';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { api } from 'common/app'


export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {pageState:'Index'};
    this.changeState = this.changeState.bind(this);
  }
  componentDidMount()
  {
    const { store } = this.context;
    
    var webState = store.getState().webState;
    // if(store.getState().webState.user_data)
    // {
    //   this.setState({pageState:'SelectAct'});
    // }else
    // {
    //   this.setState({pageState:'Index'});
    // };
    
  }
  changeState(event,to)
  {
    const { store } = this.context;
    
    if (event) {
      
      this.setState({pageState:event.target.getAttribute('to')});
    }else
    {
      this.setState({pageState:to});
      
    }
    
  }

  LocalRouter()
  {
      switch (this.state.pageState) {
        case 'Index':
          return <MainKV />;
          break;
        case 'Login':
          return <Login attrLogin={this.changeState}/>;
          break;
        case 'SelectAct':
          return <SelectAct changeState={this.changeState}/>;
          break;
      }
  }

  render() {
    return (
      <div className='OutBox'>

        <LoginBanner attrLogin={this.changeState} ref='LoginBanner' from={this.state.pageState}/>
        {/* {this.props.children} */}
        {this.LocalRouter()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
      setUser: state.User
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
      saveUser: (data) => {
          dispatch(saveUser(data))
      },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
Home.contextTypes = { store: PropTypes.object.isRequired }
