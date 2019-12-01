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
      <div className="stream-card">
        <img src={this.getThumbnail(this.props.stream.thumbnail_url)} alt="" />
        <div className="stream-info status">
          {this.props.stream.type.charAt(0).toUpperCase() + this.props.stream.type.slice(1)}
        </div>
        <div className="stream-info viewers">
          {this.getViewerCount(this.props.stream.viewer_count)}
        </div>
        <StreamInfo info={this.props.stream} />
      </div>
    )
  }
}

export default StreamItem
