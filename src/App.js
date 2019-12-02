import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import Header from './components/layout/Header';
import About from './components/pages/About';

import './App.css';
import TopStreams from './components/streams/TopStreams';

class App extends Component {
  state = {
    streams: [],
    games: [],
    follows: []
  }

  componentDidMount() {
    axios.get('//127.0.0.1/streams')
      .then(res => this.setState({ streams: res.data['data'] }))
  }

  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Header />
            <Route exact path="/">
              <div className="stream-list">
                <TopStreams streams={this.state.streams} />
              </div>
            </Route>
            <Route path="/about" component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
