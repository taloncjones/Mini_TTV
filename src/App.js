import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import LayoutJoiner from './components/layout/LayoutJoiner';
import About from './components/pages/About';
import LogIn from './components/pages/LogIn';
import Stream from './components/pages/Stream';
import StreamList from './components/streams/StreamList';
import GameList from './components/games/GameList';
import PropTypes from 'prop-types';

import './App.css';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    marginLeft: theme.spacing(7) + 1,
    flexGrow: 1,
    padding: theme.spacing(3),
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      streams: [],
      games: [],
      follows: [],
      id: '',
      profileInfo: [],
      pageName: '',
      streamName: '',
      streamsFetching: true,
      gamesFetching: true,
      folowsFetching: true,
      loginCheck: false,
      loggedIn: false,
    };
  }

  fetchStreams() {
    this.setState({ streamsFetching: true })
    axios.get('//127.0.0.1/streams', { withCredentials: true })
      .then(res => {
        this.setState({ streams: res.data['data'] })
      })
    this.setState({ streamsFetching: false })
  }

  fetchGames() {
    this.setState({ gamesFetching: true })
    axios.get('//127.0.0.1/games', { withCredentials: true })
      .then(res => {
        this.setState({ games: res.data['data'] })
      })
    this.setState({ gamesFetching: false })
  }

  fetchFollows() {
    this.setState({ folowsFetching: true })
    axios.get('//127.0.0.1/follows', { withCredentials: true })
      .then(res => {
        this.setState({ follows: res.data['data'] })
      })
    this.setState({ folowsFetching: false })
  }

  fetchData() {
    this.fetchStreams();
    this.fetchGames();
    this.fetchFollows();
  }

  fetchProfile() {
    this.setState({ isFetching: true })
    axios.get('//127.0.0.1/whoami', { withCredentials: true })
      .then(res => {
        res.data['data'].map((item) => this.setState({ profileInfo: item }));
      })
    this.setState({ loginCheck: true });
    this.setState({ isFetching: false })
  }

  loggedIn() {
    axios.get('//127.0.0.1/loggedin', { withCredentials: true })
      .then(res => this.setState({ loggedIn: res.data }))
  }

  componentDidMount() {
    this.fetchProfile();
    this.fetchData();
    this.timer = setInterval(() => {
      this.fetchData()
    }, 60000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    this.timer = null;
  }

  render() {
    if (!this.state.loginCheck) {
      this.loggedIn();
    }
    const { classes } = this.props;
    return (
      <Router>
        <div className="App">
          <div className={classes.root}>
            <LayoutJoiner loggedIn={this.state.loggedIn} streams={this.state.streams} games={this.state.games} follows={this.state.follows} />
            <main className={classes.content}>
              <div className={classes.toolbar} />
              <Switch>
                <Route path="/login">
                  <LogIn profileInfo={this.state.profileInfo} />
                </Route>
                <Route path="/about" component={About} />
                <Route path="/:stream" component={Stream} />
                <Route path="/">
                  <h1>Welcome!</h1>
                  <StreamList streams={this.state.streams} />
                </Route>/>
            </Switch>
            </main>
          </div>
        </div>
      </Router>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
