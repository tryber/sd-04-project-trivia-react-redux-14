import React, { Component } from 'react';
import { connect } from 'react-redux';

import logo from './trivia.png';
import './App.css';
import { fetchToken } from '../src/redux/actions';
import { getGravatar } from '../src/services/api';

class App extends Component {
  componentDidMount() {
    const { fetchToken } = this.props;
    fetchToken();
    
  }

  handleAvatar = () => {
    const emailtest = ' lucaslima Yoshida@gmail.com ';
    const imageURL = getGravatar(emailtest);

    return <img src={imageURL} alt="Avatar Usuário" />
  }
  
  render() { 
    return (
      <div className='App'>
        <header className='App-header'>
        <img src={logo} className="App-logo" alt="logo" />
        {this.handleAvatar()}
          <p>Hello</p>
        </header>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchToken: () => dispatch(fetchToken()),
  }
}

const mapStateToProps = (state) => ({
  isFetching: state.tokenReducer.isFetching,
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
