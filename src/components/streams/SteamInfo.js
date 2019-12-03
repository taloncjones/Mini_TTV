import React, { Component } from 'react';
import axios from 'axios';

export class SteamInfo extends Component {
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

  render() {
    return (
      <div className="stream-info-card">
        <div className="stream-info-profile-container">
          <a href={"//twitch.com/" + this.state.info.display_name}>
            <div className="stream-info-profile-box">
              <img className="stream-info-profile-image" src={this.state.info.profile_image_url} alt="" />
            </div>
          </a>
        </div>
        <div className="stream-info-text-container">
          <a href={"//twitch.com/" + this.state.info.display_name}>
            <div className="stream-info-text-title">
              {this.state.info.description}
            </div>
          </a>
          <div className="stream-info-text-minor">
            <a href={"//twitch.com/" + this.state.info.display_name}>
              {this.state.info.display_name}
            </a>
            <br/>
            <a href={"//twitch.tv/directory/game/" + this.state.game.name}>
              {this.state.game.name}
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default SteamInfo
