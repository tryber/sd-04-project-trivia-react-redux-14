import React, { Component } from 'react';

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div>
        {/* <span>Categoria: {category} </span>
          <span> Questão: {question}</span> */}
          {/* <span>{`Questão ${currentIndex + 1} de ${data.length}`}</span> */}
      </div>
    );
  }
}

export default Quiz;
