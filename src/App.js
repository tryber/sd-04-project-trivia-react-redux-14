import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './trivia.png';
import './App.css';
import { fetchToken } from '../src/redux/actions';

class App extends Component {
  componentDidMount() {
    const { fetchToken } = this.props;

    fetchToken();
  }

  render() {
    return (
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <p>Hello grupo!!!</p>
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

export default connect(null, mapDispatchToProps)(App);
