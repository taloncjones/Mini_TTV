import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  streamContainer: {
    textAlign: 'center',
    display: 'flex',
    flexFlow: 'column',
  },
  stream: {
    margin: '.5rem auto',
    flex: '1 1 auto',
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
      <div className={classes.streamContainer}>
        <div className={classes.stream} id={this.props.targetID}></div>
      </div>
    )
  }
}

Stream.defaultProps = {
  targetID: 'twitch-embed',
  width: '940',
  height: '480',
  layout: 'video',
}

export default withStyles(styles)(Stream)
