import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getGravatar } from '../../services/api';

class GameScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: getGravatar('lucaslima Yoshida@gmail.com'),
      name: 'Lucas',
      ranking: 0,
    }
  }

  render() {
    return (
      <div>
        <header>
          <img src={this.state.image} alt="Foto Gravatar" data-testid="header-profile-picture"/>
          <h3 data-testid="header-player-name">{this.state.name}</h3>
          <span data-testid="header-score">{this.state.ranking}</span>
        </header>
      </div>
    );
  }
}

export default connect(null, null)(GameScreen);
