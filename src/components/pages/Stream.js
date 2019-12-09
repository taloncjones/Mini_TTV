import React, { Component } from 'react';

class Stream extends Component {
  componentDidMount() {
    const script = document.createElement('script');
    script.setAttribute('src', 'https://embed.twitch.tv/embed/v1.js');
    script.addEventListener('load', () => {
      new window.Twitch.Embed(this.props.targetID, { ...this.props, channel: this.props.location.pathname });
    });
    document.body.appendChild(script);
  }

  render() {
    return (
      <div className="stream-container">
        <div className="stream" id={this.props.targetID}></div>
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

export default Stream
