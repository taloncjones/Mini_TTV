import React, { Component } from 'react';
import StreamInfo from './SteamInfo';

export class StreamItem extends Component {
  getThumbnail(url) {
    var tmp = url.replace('{width}', '440')
    tmp = tmp.replace('{height}', '248')
    return tmp
  }

  getViewerCount(num) {
    return num >= 1000 ? (num/1000).toFixed(1) + 'k' : num
  }

  render() {
    return (
      <div style={streamStyle}>
        <img src={this.getThumbnail(this.props.stream.thumbnail_url)} alt="" />
        <div style={liveStyle}>
          {this.props.stream.type.charAt(0).toUpperCase() + this.props.stream.type.slice(1)}
        </div>
        <div style={viewerStyle}>
          {this.getViewerCount(this.props.stream.viewer_count)}
        </div>
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
  width: '25%'
}

const liveStyle = {
  position: 'absolute',
  top: '16px',
  left: '16px',
  padding: '0 5px',
  backgroundColor: 'red',
  borderRadius: '8px'
}

const viewerStyle = {
  position: 'absolute',
  top: '16px',
  right: '16px',
  padding: '0 5px',
  backgroundColor: 'grey',
  borderRadius: '8px'
}

export default StreamItem
