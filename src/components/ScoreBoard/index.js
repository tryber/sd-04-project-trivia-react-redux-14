import React, { Component } from 'react';
import './ScoreBoard.css';
import './css-circular-prog-bar.css';

class ScoreBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      assertionRate: 0,
    };
  }

  componentDidMount() {
    this.handleAssertion();
  }

  handleAssertion = () => {
    const { questions, assertions } = this.props;
    const assertionRate = Math.round((assertions * 100) / questions);

    document.querySelector('.value-bar').style.transform = `rotate(${assertionRate * 3.6}deg)`;
    if (assertionRate > 50) document.querySelector('.progress-circle').classList.add('over50');

    this.setState({
      assertionRate,
    });
  };

  render() {
    const { assertionRate } = this.state;

    return (
      <div className="ScoreBoard">
        <div className="progress-circle">
          <span>{`${assertionRate}%`}</span>
          <div className="left-half-clipper">
            <div className="first50-bar" />
            <div className="value-bar" />
          </div>
        </div>
      </div>
    );
  }
}

export default ScoreBoard;
