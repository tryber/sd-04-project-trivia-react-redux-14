import React, { Component } from 'react';
import { connect } from 'react-redux';

import ScoreBoard from '../../components/ScoreBoard';
import Button from '../../components/button';

const mock = {
  numQuestions: 6,
  assertions: 2,
  score: 7,
};

const messages = {
  goodScore: 'Mandou bem!',
  badScore: 'Podia ser melhor...',
};

class FeedbackScreen extends Component {
  renderMessage = (score) => (
    <p data-testid="feedback-text">{score > 3 ? messages.goodScore : messages.badScore}</p>
  );

  render() {
    return (
      <div>
        {this.renderMessage(5)}
        <ScoreBoard questions={mock.numQuestions} assertions={mock.assertions} score={mock.score} />
        <Button isDisabled={false}>Menu Principal</Button>
        <Button isDisabled={false}>Ranking</Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.userDataReducer.player.score,
  assertions: state.userDataReducer.player.assertions,
});

export default connect(mapStateToProps)(FeedbackScreen);
