import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./FeedbackScreen.css";

import ScoreBoard from "../../components/ScoreBoard";
import Button from "../../components/button";

const mock = {
  numQuestions: 6,
  assertions: 4,
  score: 7,
};

const messages = {
  goodScore: "Mandou bem!",
  badScore: "Podia ser melhor...",
};

class FeedbackScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playAgain: false,
    };
  }

  renderMessage = (score) => (
    <p data-testid="feedback-text">
      {score > 3 ? messages.goodScore : messages.badScore}
    </p>
  );

  handleNewGame = () => {
    this.setState({ playAgain: true });
  };

  render() {
    const { playAgain } = this.state;

    if (playAgain) return <Redirect to="/" />;

    return (
      <div className="FeedbackScreen">
        {this.renderMessage(5)}
        <ScoreBoard
          questions={mock.numQuestions}
          assertions={mock.assertions}
          score={mock.score}
        />
        <Button isDisabled={false} data-testid="btn-play-again" onClick={() => this.handleNewGame()}>
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

export default connect(mapStateToProps)(FeedbackScreen);
