import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Proptypes from 'prop-types';

import { fetchToken, fetchQuestions, sendUserData } from '../../redux/actions';
import '../../App.css';
import Button from '../button';

class StartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { goPlay: false, isDisabled: true, };
  }

  componentDidMount() {
    const { fetchTokenProp } = this.props; //  corrigir proptypes
    fetchTokenProp();
  }

  handleUser = (gravatarEmail, name) => {
    const { sendUserDataProp } = this.props; // corrigir proptypes
    const player = {
      name,
      assertions: 0,
      score: 0,
      gravatarEmail,
    };
    sendUserDataProp(player);
  };

  handleInput = (type, event) => {
    const { value } = event.target;
    const { sendUserDataProp, name, gravatarEmail } = this.props; // proptypes

    if (name && gravatarEmail) {
      this.setState({ isDisabled: false });
    }
    if (type === 'email') {
      return sendUserDataProp({ gravatarEmail: value }); // corrigir proptypes
    }
    return sendUserDataProp({ name: value }); //tbm
  };

  playTrivia = e => {
    e.preventDefault();
    const { name, gravatarEmail } = this.props;

    this.handleUser(gravatarEmail, name);
    this.setState({ goPlay: true });

    return console.log('oops');
  };

  renderFieldsetInputs = () => (
    <fieldset className="fieldset-inputs-start-screen">
      <label htmlFor="input-gravatar-email">Email do Gravatar:</label>
      <input
        type="email"
        data-testid="input-gravatar-email"
        id="input-gravatar-email"
        placeholder="<name@email.com>"
        onChange={e => this.handleInput('email', e)}
        required
      />
      <label htmlFor="input-player-name">Nome do Jogador:</label>
      <input
        type="text"
        data-testid="input-player-name"
        id="input-player-name"
        placeholder="<player name>"
        onChange={e => this.handleInput('name', e)}
        required
      />
    </fieldset>
  );

  renderFieldsetButtons = () => (
    <fieldset className="fieldset-buttons-start-screen">
      <Link to="/settings">
        <label htmlFor="btn-settings">
          <Button
            type="button"
            data-testid="btn-settings"
            className="btn-settings"
            id="btn-settings"
          >
            OPÇÕES...
          </Button>
        </label>
      </Link>
      <label htmlFor="btn-play">
        <Button
          isDisabled={this.state.isDisabled}
          type="submit"
          data-testid="btn-play"
          className="btn-play"
          id="btn-play"
          onClick={(e) => this.playTrivia(e)}
        >
          JOGAR!
        </Button>
      </label>
    </fieldset>
  );

  render() {
    const { goPlay } = this.state;
    if (goPlay) {
      return <Redirect to="/trivia" />;
    }
    return (
      <div className="trivia-screen">
        <form className="form-start-screen">
          {this.renderFieldsetInputs()}
          {this.renderFieldsetButtons()}
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchTokenProp: () => dispatch(fetchToken()),
  fetchQuestionsProp: () => dispatch(fetchQuestions()),
  sendUserDataProp: (userData) => dispatch(sendUserData(userData)),
});

const mapStateToProps = (state) => ({
  isFetching: state.tokenReducer.isFetching,
  gravatarEmail: state.userDataReducer.player.gravatarEmail,
  name: state.userDataReducer.player.name,
});

StartScreen.propTypes = {
  fetchTokenProp: Proptypes.func.isRequired,
  fetchQuestionsProp: Proptypes.func.isRequired,
  sendUserDataProp: Proptypes.func.isRequired,
  isFetching: Proptypes.bool.isRequired,
  gravatarEmail: Proptypes.object.isRequired,
  name: Proptypes.object.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(StartScreen);
