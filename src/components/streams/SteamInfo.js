import React, { Component } from 'react';
import axios from 'axios';

export class SteamInfo extends Component {
  state = {
    info: []
  }

  componentDidMount() {
    axios.get('//127.0.0.1/user/' + this.props.stream.user_id)
      .then(res => this.setState({ info: res.data['data'][0] }))
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
          <p>{this.state.info.description}</p>
        </div>
      </div>
    )
  }
}

export default SteamInfo
