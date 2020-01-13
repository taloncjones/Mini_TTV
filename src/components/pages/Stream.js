import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  grow: {
    height: '100%',
  },
});

class Stream extends Component {
  componentDidMount() {
    this.props.setStream(this.props.location.pathname);
    const script = document.createElement('script');
    script.setAttribute('src', 'https://embed.twitch.tv/embed/v1.js');
    script.addEventListener('load', () => {
      new window.Twitch.Embed(this.props.targetID, { ...this.props, channel: this.props.location.pathname });
    });
    document.body.appendChild(script);
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.grow} alignItems="stretch">
        <Grid item xs className={classes.stream} id={this.props.targetID} />
      </Grid>
    )
  }
}

Stream.defaultProps = {
  targetID: 'twitch-embed',
  width: '100%',
  height: '100%',
  layout: 'video',
}

export default withStyles(styles)(Stream)
