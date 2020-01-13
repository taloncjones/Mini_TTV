import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import axios from 'axios';

var mini_ttv_api = require('../Url.json')['url'];


const styles = theme => ({
  gameCard: {
    color: theme.palette.text.primary,
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: theme.spacing(1),
    padding: theme.spacing(0, .5),
    borderRadius: theme.spacing(.5),
    color: theme.palette.text.primary,
  },
  viewers: {
    right: theme.spacing(1),
    backgroundColor: 'grey',
  },
});

export class GameItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: [],
      total: 0
    };
  }

  componentDidMount() {
    axios.get('//' + mini_ttv_api + '/game_info/' + this.props.game.id)
      .then(res => {
        this.setState({ info: res.data['data'] })
        var i;
        var t = 0;
        for (i = 0; i < this.state.info.length; i++) {
          t += this.state.info[i]['viewer_count'];
        }
        this.setState({ total: this.getViewerCount(t) })
      })
  }

  getThumbnail(url) {
    var tmp = url.replace('{width}', '285')
    tmp = tmp.replace('{height}', '380')
    return tmp
  }

  getViewerCount(num) {
    return num >= 1000 ? (num / 1000).toFixed(1) + 'k' : num
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid item className={classes.gameCard} xs={12}>
        <Link onClick={event => this.props.setGameInfo(this.state.info)}>
          <img src={this.getThumbnail(this.props.game.box_art_url)} alt="" />
          <div className={`${classes.overlay} ${classes.viewers}`}>
            {this.state.total}
          </div>
        </Link>
      </Grid>
    )
  }
}

export default withStyles(styles)(GameItem)
