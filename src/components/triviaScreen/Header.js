import React, { Component } from 'react';
import { connect } from 'react-redux';
import { sendUrlGravatar } from '../../redux/actions';
import { getGravatar } from '../../services/api';

class Header extends Component {
  componentDidMount() {
    const { sendUrlGravatarProps, email } = this.props;
    const urlEmail = getGravatar(email);
    sendUrlGravatarProps(urlEmail);
  }

  render() {
    const { urlGravatar, name, score } = this.props;
    return (
      <header>
        <img src={urlGravatar} alt='Foto Gravatar' data-testid='header-profile-picture' />
        <h3 data-testid='header-player-name'>{name}</h3>
        <span data-testid='header-score'>{score}</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.userDataReducer.player.gravatarEmail,
  name: state.userDataReducer.player.name,
  score: state.userDataReducer.player.score,
  urlGravatar: state.userDataReducer.picture,
});

const mapDispatchToProps = (dispatch) => ({
  sendUrlGravatarProps: (url) => dispatch(sendUrlGravatar(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
