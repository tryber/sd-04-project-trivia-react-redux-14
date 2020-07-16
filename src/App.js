import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import logo from './trivia.png';
import './App.css';
import StartScreen from './components/startScreen';
import SettingsScreen from './components/settingsScreen';
import NotFound from './components/notFound';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <Switch>
          <Route exact path="/" component={StartScreen} />
          <Route exact path="/settings" component={SettingsScreen} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default App;
