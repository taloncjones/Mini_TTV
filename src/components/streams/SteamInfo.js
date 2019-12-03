import React, { Component } from 'react';

export class SteamInfo extends Component {
  render() {
    return (
      <div className="stream-info-card">
        <div className="stream-info-profile-container">
          <a href={"//twitch.com/" + this.props.info.display_name}>
            <div className="stream-info-profile-box">
              <img className="stream-info-profile-image" src={this.props.info.profile_image_url} alt="" />
            </div>
          </a>
        </div>
        <div className="stream-info-text-container">
          <a href={"//twitch.com/" + this.props.info.display_name}>
            <div className="stream-info-text-title">
              {this.props.info.description}
            </div>
          </a>
          <div className="stream-info-text-minor">
            <a href={"//twitch.com/" + this.props.info.display_name}>
              {this.props.info.display_name}
            </a>
            <br/>
            <a href={"//twitch.tv/directory/game/" + this.props.game.name}>
              {this.props.game.name}
            </a>
          </div>
        </div>
      </div>
    )
  }
}

export default SteamInfo
