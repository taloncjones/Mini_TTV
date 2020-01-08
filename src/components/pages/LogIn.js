import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

var mini_ttv_api = require('../Url.json')['url'];

class LogIn extends Component {
  displayPage() {
    let link;
    if (this.props.profileInfo.length === 0) {
      link = '//' + mini_ttv_api + '/login';
      return (
        <div className="profile-card">
          <h3>Logging in will allow you to view your followed channels.</h3>
          <Button href={ link } variant="contained" color="primary">Log In to Twitch TV!</Button>
        </div>
      )
    } else {
      link = '//' + mini_ttv_api + '/disconnect';
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
          <Button href={ link } variant="contained" color="primary">Log Out?</Button>
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

