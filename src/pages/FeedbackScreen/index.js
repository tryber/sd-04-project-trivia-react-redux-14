import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import './FeedbackScreen.css';
import Medal from '../../images/medal.svg';

import ScoreBoard from '../../components/ScoreBoard';
import Button from '../../components/button';

const mock = {
  numQuestions: 5,
  assertions: 4,
  score: 700,
};

const messages = {
  goodScore: 'Mandou bem!',
  badScore: 'Podia ser melhor...',
};

class FeedbackScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playAgain: false,
    };
  }

  renderMessage = (score) => (
    <>
      <div className="ranking-status">
        <img src={Medal} alt="In rank medal" />
        <h2>Você esta no Ranking!</h2>
      </div>
      <h2 data-testid="feedback-text">{score > 3 ? messages.goodScore : messages.badScore}</h2>
    </>
  );

  handleNewGame = () => {
    this.setState({ playAgain: true });
  };

  render() {
    const { playAgain } = this.state;
    const { score, assertions } = this.props;

    if (playAgain) return <Redirect to="/" />;

    return (
      <div className="FeedbackScreen">
        {this.renderMessage(score)}
        <ScoreBoard questions={mock.numQuestions} assertions={assertions} score={score} />
        <Button
          isDisabled={false}
          data-testid="btn-play-again"
          onClick={() => this.handleNewGame()}
        >
          Jogar Novamente
        </Button>
        <Button isDisabled={false} data-testid="btn-ranking">
          Ver Raking
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.userDataReducer.player.score,
  assertions: state.userDataReducer.player.assertions,
});

FeedbackScreen.propTypes = {
  score: Proptypes.number.isRequired,
  assertions: Proptypes.number.isRequired,
};

export default connect(mapStateToProps)(FeedbackScreen);
