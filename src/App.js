import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './redux/store';
import logo from './trivia.png';
import './App.css';

import StartScreen from './components/startScreen';
import SettingsScreen from './components/settingsScreen';
import FeedbackScreen from './pages/FeedbackScreen';
import NotFound from './components/notFound';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
            </header>
            <Switch>
              <Route exact path="/" component={StartScreen} />
              <Route exact path="/settings" component={SettingsScreen} />
              <Route exact path="/feedback" component={FeedbackScreen} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
