import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import StreamInfo from './SteamInfo';
import axios from 'axios';

var mini_ttv_api = require('../Url.json')['url'];

const styles = theme => ({
  grow: {
    flexGrow: 1,
  },
  paper: {
    textAlign: 'center',
    backgroundColor: theme.palette.secondary[900],
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    color: theme.palette.text.primary,
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: theme.spacing(.5),
    padding: theme.spacing(0),
    paddingLeft: theme.spacing(.5),
    paddingRight: theme.spacing(.5),
    borderRadius: theme.spacing(.5),
    color: theme.palette.text.primary,
  },
  status: {
    left: theme.spacing(1),
    backgroundColor: 'red',
  },
  viewers: {
    right: theme.spacing(1),
    backgroundColor: 'grey',
  }
});

class StreamItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: [],
      game: []
    };
  }

  componentDidMount() {
    axios.get('//' + mini_ttv_api + '/user/' + this.props.stream.user_id)
      .then(res => this.setState({ info: res.data['data'][0] }))
    if (this.props.stream.game_id) {
      axios.get('//' + mini_ttv_api + '/game/' + this.props.stream.game_id)
        .then(res => this.setState({ game: res.data['data'][0] }))
    }
  }

  getThumbnail(url) {
    var tmp = url.replace('{width}', '440')
    tmp = tmp.replace('{height}', '248')
    return tmp
  }

  getViewerCount(num) {
    return num >= 1000 ? (num / 1000).toFixed(1) + 'k' : num
  }

  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.paper}>
        <Grid container>
          <Grid item xs={12}>
            <Link href={"/" + this.state.info.display_name}>
              <img src={this.getThumbnail(this.props.stream.thumbnail_url)} alt="" />
              <div className={`${classes.overlay} ${classes.status}`}>
                {this.props.stream.type.charAt(0).toUpperCase() + this.props.stream.type.slice(1)}
              </div>
              <div className={`${classes.overlay} ${classes.viewers}`}>
                {this.getViewerCount(this.props.stream.viewer_count)}
              </div>
            </Link>
          </Grid>
          <StreamInfo info={this.state.info} game={this.state.game} />
        </Grid>
      </Paper>
    )
  }
}

export default withStyles(styles)(StreamItem)
