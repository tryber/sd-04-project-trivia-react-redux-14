import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import '../../App.css';
import { fetchToken, fetchQuestions } from '../../redux/actions';
import { getGravatar } from '../../services/api';

class StartScreen extends Component {
  componentDidMount() {
    const { fetchTokenProp, fetchQuestionsProp } = this.props;
    fetchTokenProp();
    fetchQuestionsProp();
  }

  handleAvatar = (email, name) => {
    const { fetchTokenProp, fetchQuestionsProp } = this.props;
    fetchTokenProp();
    fetchQuestionsProp();
    // const emailtest = ' lucaslima Yoshida@gmail.com ';
    const imageURL = getGravatar(email);

    return <img src={imageURL} alt="Avatar Usuário" />;
  };

  renderFieldsetInputs = () => {
    return (
      <fieldset className="fieldset-inputs-start-screen">
        <label htmlFor="input-gravatar-email">Email do Gravatar:</label>
        <input
          type="email"
          data-testid="input-gravatar-email"
          id="input-gravatar-email"
          placeholder="<name@email.com>"
          required
        />
        <label htmlFor="input-player-name">Nome do Jogador:</label>
        <input
          type="text"
          data-testid="input-player-name"
          id="input-player-name"
          placeholder="<player name>"
          required
        />
      </fieldset>
    );
  };

  renderFieldsetButtons = () => {
    return (
      <fieldset className="fieldset-buttons-start-screen">
        <Link to="/settings">
          <label htmlFor="btn-settings">
            <button
              type="button"
              data-testid="btn-settings"
              className="btn-settings"
              id="btn-settings"
            >
              OPÇÕES...
            </button>
          </label>
        </Link>
        <Link to="/trivia">
          <label htmlFor="btn-play">
            <button type="submit" data-testid="btn-play" className="btn-play" id="btn-play">
              JOGAR!
            </button>
          </label>
        </Link>
      </fieldset>
    );
  };

  render() {
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

const mapDispatchToProps = dispatch => ({
  fetchTokenProp: () => dispatch(fetchToken()),
  fetchQuestionsProp: () => dispatch(fetchQuestions()),
});

const mapStateToProps = state => ({
  isFetching: state.tokenReducer.isFetching,
});

export default connect(mapStateToProps, mapDispatchToProps)(StartScreen);
