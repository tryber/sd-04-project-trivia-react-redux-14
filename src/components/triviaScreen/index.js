import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Proptypes from 'prop-types';

import { fetchQuestions } from '../../redux/actions/actionQuest';
import '../../App.css';
import Header from './Header';
import Button from '../button';

class TriviaScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userAnswer: null,
      currentIndex: 0,
      score: 0,
      isDisabled: true,
      quizEnd: false,
      shuffledAnswers: undefined,
    };
  }

  componentDidMount() {
    const { fetchQuestionsProp } = this.props;
    fetchQuestionsProp();
  }

  finishHandler = () => this.setState({ quizEnd: true });

  nextQuestionHandler = (e) => {
    e.preventDefault();
    const { currentIndex, score, userAnswer } = this.state;
    const { data } = this.props;

    if (currentIndex === data.length - 1) return this.finishHandler();

    if (userAnswer === data[currentIndex].correct_answer) {
      return this.setState({
        score: score + 1,
        userAnswer: null,
        shuffledAnswers: undefined,
        currentIndex: currentIndex + 1,
        isDisabled: true,
      });
    }

    return this.setState({
      userAnswer: null,
      shuffledAnswers: undefined,
      currentIndex: currentIndex + 1,
      isDisabled: true,
    });
  };

  checkAnswer = (choice) => {
    document.querySelector('.correct-answer').classList.add('green-border');
    document.querySelectorAll('.wrong-answer').forEach((answer) => answer.classList.add('red-border'));
    document.querySelectorAll('.answer').forEach((answer) => {
      const button = answer;
      button.disabled = true;
    });

    this.setState({
      userAnswer: choice,
      isDisabled: false,
    });
  };

  shuffle = (array) => {
    const originalArray = array;
    let currentIndex = array.length;
    let temporaryValue = '';
    let randomIndex = 0;

    //  While there remain elements to shuffle...
    while (currentIndex !== 0) {
      //  Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      //  And swap it with the current element.
      //  Valor temporário recebe valor do index atual do array
      temporaryValue = originalArray[currentIndex];
      //  Valor atual recebe valor aleatório da array
      originalArray[currentIndex] = originalArray[randomIndex];
      // Valor aleatorio recebe valor atual
      originalArray[randomIndex] = temporaryValue;
    }

    this.setState({
      shuffledAnswers: originalArray,
    });

    return originalArray;
  }

  optionsAnswers = (data) => {
    const { currentIndex, shuffledAnswers } = this.state;
    const correctAnswer = data[currentIndex].correct_answer;
    const incorrectAnswers = data[currentIndex].incorrect_answers;
    const answers = [correctAnswer, ...incorrectAnswers];

    const arrayNew = (shuffledAnswers) || this.shuffle(answers);

    const setButton = arrayNew.map((answer) => (
      <Button
        key={answer}
        type="button"
        onClick={() => this.checkAnswer(answer)}
        data-testid={answer === correctAnswer ? 'correct-answer' : 'wrong-answer'}
        className={`answer ${answer === correctAnswer ? 'correct-answer' : 'wrong-answer'}`}
      >
        {answer}
      </Button>
    ));

    return (
      <div className="answers">
        {setButton}
      </div>
    );
  }

  render() {
    const { quizEnd, isDisabled, currentIndex } = this.state;
    const { data, isFetchingToken, isFetchingQuestion } = this.props;

    if (isFetchingToken || isFetchingQuestion) return <Header />;
    if (quizEnd) return <Redirect to="/feedback" />;
    console.log('renderizando', data);
    return (
      <div>
        <Header />
        <div>
          <h3 data-testid="question-category">{data[currentIndex].category}</h3>
          <h3 data-testid="question-text">{data[currentIndex].question}</h3>
          <span>{`Questão ${currentIndex + 1} de ${data.length}`}</span>
        </div>
        <div>{this.optionsAnswers(data)}</div>
        {!isDisabled ? (
          <Button
            isDisabled={isDisabled}
            type="button"
            data-testid="btn-next"
            onClick={(e) => this.nextQuestionHandler(e)}
          >
            Próxima
          </Button>
        ) : null }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.questionsReducer.questions,
  isFetchingToken: state.tokenReducer.isFetchingToken,
  isFetchingQuestion: state.questionsReducer.isFetchingQuestion,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuestionsProp: () => dispatch(fetchQuestions()),
});

TriviaScreen.propTypes = {
  fetchQuestionsProp: Proptypes.func.isRequired,
  data: Proptypes.objectOf(Proptypes.string).isRequired, // Proptypes.object is forbidden -> teste
  isFetchingToken: Proptypes.func.isRequired,
  isFetchingQuestion: Proptypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TriviaScreen);
