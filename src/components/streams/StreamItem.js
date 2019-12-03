import React, { Component } from 'react';
import StreamInfo from './SteamInfo';
import axios from 'axios';

export class StreamItem extends Component {
  state = {
    info: [],
    game: []
  }

  componentDidMount() {
    axios.get('//127.0.0.1/user/' + this.props.stream.user_id)
      .then(res => this.setState({ info: res.data['data'][0] }))
    axios.get('//127.0.0.1/game/' + this.props.stream.game_id)
      .then(res => this.setState({ game: res.data['data'][0] }))
  }
  
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
        <div className="stream-overlay status">
          {this.props.stream.type.charAt(0).toUpperCase() + this.props.stream.type.slice(1)}
        </div>
        <div className="stream-overlay viewers">
          {this.getViewerCount(this.props.stream.viewer_count)}
        </div>
        <StreamInfo info={this.state.info} game={this.state.game} />
      </div>
    )
  }
}

export default StreamItem
