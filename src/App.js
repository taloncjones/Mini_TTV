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
import PropTypes from 'prop-types';

import './App.css';

const mini_ttv_api = require('./components/Url.json')['url'];

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
    paddingLeft: theme.spacing(10) + 1,
    padding: theme.spacing(3),
    width: '100%',
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
          <div className="App">
            <div className={classes.root}>
              <LayoutJoiner loggedIn={this.state.loggedIn} profileInfo={this.state.profileInfo} history={this.state.history} streamName={this.state.streamName} />
              <main className={classes.content}>
                <div className={classes.toolbar} />
                <Switch>
                  <Route path="/login">
                    <LogIn profileInfo={this.state.profileInfo} />
                  </Route>
                  <Route path="/about" component={About} />
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
                    <h1>Welcome!</h1>
                  </Route>/>
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
