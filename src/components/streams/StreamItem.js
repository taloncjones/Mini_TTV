import React, { Component } from 'react';
import StreamInfo from './SteamInfo';
import { relative, isAbsolute } from 'path';

export class StreamItem extends Component {
  getThumbnail(url) {
    var tmp = url.replace('{width}', '440')
    tmp = tmp.replace('{height}', '248')
    return tmp
  }

  render() {
    return (
      <div style={streamStyle}>
        <img src={this.getThumbnail(this.props.stream.thumbnail_url)} alt="" />
        <div style={liveStyle}>{this.props.type}</div>
        <StreamInfo info={this.props.stream} />
      </div>
    )
  }
}

const streamStyle = {
  backgroundColor: '#333',
  padding: '10px',
  color: '#fff',
  position: 'relative',
}

const liveStyle = {
  position: 'absolute',
  top: '16px',
  left: '16px',
  padding: '0px 5px',
  backgroundColor: 'red',
  borderRadius: '8px'
}

export default StreamItem
