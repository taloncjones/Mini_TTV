import React, { Component } from 'react';
import axios from 'axios';

class LogIn extends Component {
  displayPage() {
    let body
    if (this.props.profileInfo.length == 0) {
      return (
        <div className="profile-card">
          <h3>Logging in will allow you to view your followed channels.</h3>
          <a href="//127.0.0.1/login" className="my-button no-hover">Log In to Twitch TV!</a>
        </div>
      )
    } else {
      return (
        <div className="profile-card">
          <h3>Hi</h3>
          <div className="profile-name">{this.props.profileInfo.display_name}</div>
          <div className="profile-container">
            <a href={"/" + this.props.profileInfo.display_name}>
              <div className="profile-box">
                <img className="profile-image" src={this.props.profileInfo.profile_image_url} alt="" />
              </div>
            </a>
          </div>
          <a href="//127.0.0.1/disconnect" className="my-button no-hover">Log Out?</a>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="about-page">
        <div className="about-container">
          {this.displayPage()}
        </div>
      </div>
    )
  }
}

export default LogIn
