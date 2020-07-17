import React from 'react';
import { getGravatar } from '../../services/api';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: getGravatar('lucaslima Yoshida@gmail.com'),
      name: 'Lucas',
      ranking: 0,
    }
  }

  render() {
    const { name, image, ranking } = this.state;
    return (
      <header>
          <img src={image} alt="Foto Gravatar" data-testid="header-profile-picture"/>
          <h3 data-testid="header-player-name">{name}</h3>
          <span data-testid="header-score">{ranking}</span>
        </header>
    );
  }
}

export default Header;
