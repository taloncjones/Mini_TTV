import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './components/theme/Theme';
import axios from 'axios';
import LayoutJoiner from './components/layout/LayoutJoiner';
import About from './components/pages/About';
import LogIn from './components/pages/LogIn';
import Stream from './components/pages/Stream';
import StreamList from './components/streams/StreamList';
import GameList from './components/games/GameList';
import Welcome from './components/pages/Welcome';
import PropTypes from 'prop-types';
import { grey } from '@material-ui/core/colors';

import './App.css';

const mini_ttv_api = require('./components/Url.json')['url'];

const styles = theme => ({
  app: {
  },
  root: {
    display: 'flex',
  },
  toolbar: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    paddingLeft: theme.spacing(7) + 1,
    width: '100%',
    top: theme.spacing(8),
    bottom: '0',
    position: 'absolute',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: theme.spacing(1),
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: grey[900],
      borderRadius: theme.spacing(1),
    },
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
      streamName: '',
      streamsFetching: true,
      gamesFetching: true,
      folowsFetching: true,
      loginCheck: false,
      loggedIn: false,
      history: [],
    };
  }

  fetchStreams() {
    this.setState({ streamsFetching: true })
    axios.get('//' + mini_ttv_api + '/streams', { withCredentials: true })
      .then(res => {
        this.setState({ streams: res.data['data'] })
      })
    this.setState({ streamsFetching: false })
  }

  fetchGames() {
    this.setState({ gamesFetching: true })
    axios.get('//' + mini_ttv_api + '/games', { withCredentials: true })
      .then(res => {
        this.setState({ games: res.data['data'] })
      })
    this.setState({ gamesFetching: false })
  }

  fetchFollows() {
    this.setState({ folowsFetching: true })
    axios.get('//' + mini_ttv_api + '/follows', { withCredentials: true })
      .then(res => {
        this.setState({ follows: res.data['page1'] })
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
    axios.get('//' + mini_ttv_api + '/whoami', { withCredentials: true })
      .then(res => {
        res.data['data'].map((item) => this.setState({ profileInfo: item }));
      })
    this.setState({ loginCheck: true });
    this.setState({ isFetching: false });
  }

  loggedIn() {
    axios.get('//' + mini_ttv_api + '/loggedin', { withCredentials: true })
      .then(res => this.setState({ loggedIn: res.data }))
  }

  setStream = (stream) => {
    this.setState({ streamName: stream.substr(1) })
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
        <MuiThemeProvider theme={theme}>
          <div className={classes.app}>
            <div className={classes.root}>
              <LayoutJoiner loggedIn={this.state.loggedIn} profileInfo={this.state.profileInfo} history={this.state.history} streamName={this.state.streamName} />
              <main className={classes.content}>
                <Switch>
                  <Route path="/login">
                    <LogIn profileInfo={this.state.profileInfo} />
                  </Route>
                  <Route path="/about">
                    <About />
                  </Route>
                  <Route path="/streams">
                    <StreamList streams={this.state.streams} />
                  </Route>
                  <Route path="/games">
                    <GameList games={this.state.games} />
                  </Route>
                  <Route path="/following">
                    {this.state.loggedIn ? <StreamList streams={this.state.follows} /> : <Redirect to="/login" />}
                  </Route>
                  <Route path="/:stream" render={(props) => <Stream {...props} setStream={this.setStream}/>} />
                  <Route path="/">
                    <Welcome />
                  </Route>
                </Switch>
              </main>
            </div>
          </div>
        </MuiThemeProvider>
      </Router>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
