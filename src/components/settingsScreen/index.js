import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SettingsScreen extends Component {
  render() {
    return (
      <div className="trivia-screen">
        TELA DE CONFIGURAÇÕES
        <Link to="/">
          <button type="button">Voltar</button>
        </Link>
      </div>
    );
  }
}
export default SettingsScreen;
