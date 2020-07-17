import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchQuestions } from '../../redux/actions';
import Header from './Header';
import Quiz from './Quiz';
import data from './data';

class TriviaScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userAnswer: null,
      currentIndex: 0,
      quizEnd: false,
      options: [],
      score: 0,
      assertions: 0,
      isDisable: true,
    };
  }

  componentDidMount() {
    const { fetchQuestionsProp, questions } = this.props;
    fetchQuestionsProp();
    this.loadQuiz();
  }

  componentDidUpdate(prevProp, prevState) {
    const { currentIndex } = this.state;
    if (currentIndex !== prevState.currentIndex) {
      this.loadQuiz();
    }
  }

  finishHandler = () => this.setState({ quizEnd: true });

  nextQuestionHandler = () => {
    const { userAnswer, answer, score, currentIndex } = this.state;

    if (currentIndex === data.length - 1) return this.finishHandler();

    if (userAnswer === answer) {
      return this.setState({ score: score + 1 });
    }

    return this.setState({
      userAnswer: null,
      currentIndex: currentIndex + 1,
    });
  };

  checkAnswer = (choice) => {
    this.setState({
      userAnswer: choice,
      isDisable: false,
    });
  };

  loadQuiz() {
    const { currentIndex } = this.state;
    this.setState({
      question: data[currentIndex].question,
      options: data[currentIndex].incorrect_answers.concat(data[currentIndex].correct_answer),
      answer: data[currentIndex].correct_answer,
      category: data[currentIndex].category,
    });
  }

  render() {
    const { question, quizEnd, isDisable } = this.state;
    if (quizEnd) {
      <Redirect to='/feedback' />;
    }
    return (
      <div>
        <HeaderGame />
        <Quiz />
        <Button 
          isDisable
          type="button"

        >
          Próxima
        </Button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchQuestionsProp: () => dispatch(fetchQuestions()),
});

export default connect(null, mapDispatchToProps)(TriviaScreen);
