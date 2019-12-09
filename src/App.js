import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import Header from './components/layout/Header';
import About from './components/pages/About';
import Stream from './components/pages/Stream';
import TopStreams from './components/streams/TopStreams';
import TopGames from './components/games/TopGames';

import './App.css';

class App extends Component {
  state = {
    streams: [],
    games: [],
    follows: []
  }

  componentDidMount() {
    axios.get('//127.0.0.1/streams')
      .then(res => this.setState({ streams: res.data['data'] }))
    axios.get('//127.0.0.1/games')
      .then(res => this.setState({ games: res.data['data'] }))
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Switch>
              <Route path="/about" component={About} />
              <Route path="/:stream">
                <Stream />
              </Route>
              <Route path="/">
                <TopStreams streams={this.state.streams} />
                <TopGames games={this.state.games} />
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
