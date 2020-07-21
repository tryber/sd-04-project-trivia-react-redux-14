import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/button';

class Ranking extends Component {
  render() {
    return (
      <div className="ranking-screen">
        <h2 data-testid="ranking-title">Ranking</h2>
        Ranking page
        <Link to="/">
          <Button type="button" data-testid="btn-go-home">
            Voltar para o início
          </Button>
        </Link>
      </div>
    );
  }
}
export default Ranking;
