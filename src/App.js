import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './trivia.png';
import './App.css';
import { fetchToken, fetchQuestions } from './redux/actions';
import { getGravatar } from './services/api';

class App extends Component {
  componentDidMount() {
    const { fetchTokenProp, fetchQuestionsProp } = this.props;
    fetchTokenProp();
    fetchQuestionsProp();
  }

  handleAvatar = () => {
    const emailtest = ' lucaslima Yoshida@gmail.com ';
    const imageURL = getGravatar(emailtest);

    return <img src={imageURL} alt="Avatar Usuário" />;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {this.handleAvatar()}
          <p>Hello</p>
        </header>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchTokenProp: () => dispatch(fetchToken()),
  fetchQuestionsProp: () => dispatch(fetchQuestions()),
});

const mapStateToProps = (state) => ({
  isFetching: state.tokenReducer.isFetching,
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
