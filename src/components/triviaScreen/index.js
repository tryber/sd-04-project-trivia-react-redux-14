import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchQuestions } from '../../redux/actions';
import Header from './Header';
import Button from '../button';

class TriviaScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userAnswer: null,
      currentIndex: 0,
      options: [],
      score: 0,
      question: '',
      answer: '',
      isDisable: true,
      quizEnd: false,
      category: '',
      assertions: 0,
    };
  }

  componentDidMount() {
    const { fetchQuestionsProp } = this.props;
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

  nextQuestionHandler = (e) => {
    e.preventDefault();
    const {
      userAnswer, answer, score, currentIndex,
    } = this.state;
    const { data } = this.props;

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
    const { data } = this.props;
    console.log(data)
    this.setState({
      question: data[currentIndex].question,
      options: data[currentIndex].incorrect_answers.concat(data[currentIndex].correct_answer),
      answer: data[currentIndex].correct_answer,
      category: data[currentIndex].category,
    });
  }

  render() {
    const {
      question, category, quizEnd, isDisable, currentIndex,
    } = this.state;
    const { data } = this.props;

    if (quizEnd) return <Redirect to="/feedback" />;

    return (
      <div>
        <Header />
        <div>
          <span>
            {category}
          </span>
          <span>
            Questão:
            {question}
          </span>
          <span>{`Questão ${currentIndex + 1} de ${data.length}`}</span>
        </div>
        <Button
          isDisable={isDisable}
          type="button"
          data-testid="btn-next"
          onClick={(e) => this.nextQuestionHandler(e)}
        >
          Próxima
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  data: state.questionsReducer.questions,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuestionsProp: () => dispatch(fetchQuestions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TriviaScreen);
