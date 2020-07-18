import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchQuestions } from '../../redux/actions/actionQuest';
import Header from './Header';
import Button from '../button';

class TriviaScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userAnswer: null,
      currentIndex: 0,
      score: 0,
      isDisable: true,
      quizEnd: false,
    };
  }

  componentDidMount() {
    //  teste push
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

  optionsAnswers(data) {
    const { currentIndex } = this.state;
    const options = data[currentIndex].incorrect_answers.concat(data[currentIndex].correct_answer);
    // const optionsRand = options[Math.floor(Math.random() * options.length)];
    console.log(options)
    return options.map((option) => (
      <Button key={option.question} type="button" onClick={() => this.checkAnswer(option)}>
        {option}
      </Button>
    ));
  }

  render() {
    const {
      quizEnd, isDisable, currentIndex } = this.state;
    const { data, isFetchingToken, isFetchingQuestion } = this.props;

    if (isFetchingToken || isFetchingQuestion) return <Header />;
    if (quizEnd) return <Redirect to="/feedback" />;
    console.log("renderizando", data);
    return (
      <div>
        <Header />
        <div>
          <h3 data-testid="question-category">
            {data[currentIndex].category}
          </h3>
          <h3 data-testid="question-text">
            {data[currentIndex].question}
          </h3>
          <span>{`Questão ${currentIndex + 1} de ${data.length}`}</span>
        </div>
        <div>
          {this.optionsAnswers(data)}
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
  isFetchingToken: state.tokenReducer.isFetchingToken,
  isFetchingQuestion: state.questionsReducer.isFetchingQuestion,
});

const mapDispatchToProps = (dispatch) => ({
  fetchQuestionsProp: () => dispatch(fetchQuestions()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TriviaScreen);
