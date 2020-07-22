import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { saveToLocalStorage, loadFromLocalStorage } from '../../services/localStorage';
import './FeedbackScreen.css';
import Medal from '../../images/medal.svg';
import ScoreBoard from '../../components/ScoreBoard';
import Button from '../../components/button';
import Header from '../../components/header';

const messages = {
  goodAssertion: 'Mandou bem!',
  badAssertion: 'Podia ser melhor...',
};

class FeedbackScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playAgain: false,
    };
  }

  componentDidMount() {
    const { name, score, picture } = this.props;

    const actualRanking = loadFromLocalStorage('ranking') ? loadFromLocalStorage('ranking') : [];
    console.log(actualRanking);
    actualRanking.push({ name, score, picture });
    saveToLocalStorage('ranking', actualRanking);
  }

  handleNewGame = () => {
    this.setState({ playAgain: true });
  };

  renderMessage = (assertions) => (
    <div>
      <div className="ranking-status">
        <img src={Medal} alt="In rank medal" />
        <h2>Você está no Ranking!</h2>
      </div>
      <h2 data-testid="feedback-text">{assertions >= 3 ? messages.goodAssertion : messages.badAssertion}</h2>
    </div>
  );

  render() {
    const { playAgain } = this.state;
    const { score, assertions } = this.props;

    if (playAgain) return <Redirect to="/" />;

    return (
      <div className="FeedbackScreen">
        <Header />
        {this.renderMessage(assertions)}
        <ScoreBoard questions="5" assertions={assertions} score={score} />
        <Button
          isDisabled={false}
          data-testid="btn-play-again"
          onClick={() => this.handleNewGame()}
        >
          Jogar Novamente
        </Button>
        <Link to="/ranking">
          <Button isDisabled={false} data-testid="btn-ranking">
            Ver Raking
          </Button>
        </Link>
        <Link to="/">
          <Button isDisabled={false} data-testid="btn-go-home">
            Voltar para o início
          </Button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  score: state.userDataReducer.player.score,
  assertions: state.userDataReducer.player.assertions,
  name: state.userDataReducer.player.name,
  picture: state.userDataReducer.picture,
});

FeedbackScreen.propTypes = {
  score: Proptypes.number.isRequired,
  assertions: Proptypes.number.isRequired,
  name: Proptypes.string.isRequired,
  picture: Proptypes.string.isRequired,
};

export default connect(mapStateToProps)(FeedbackScreen);
