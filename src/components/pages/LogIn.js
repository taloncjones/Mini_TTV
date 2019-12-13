import React, { Component } from 'react';
import axios from 'axios';

class LogIn extends Component {
  onClick() {
    axios.get('//127.0.0.1/login')
      .then(res => {
        console.log(res.data)
      })
  }

  displayPage() {
    let body
    if (!this.props.id) {
      return (
        <div>
          <h3>Logging in will allow you to view your followed channels.</h3>
          <a href="//127.0.0.1/login">
            <button className="log-button">Log In to Twitch TV!</button>
          </a>
        </div>
      )
    } else {
      return (
        <div className="profile">
          <h3>Hi {this.props.profile_info.display_name}</h3>
          <div className="profile-container">
            <a href={"/" + this.props.profile_info.display_name}>
              <div className="profile-box">
                <img className="profile-image" src={this.props.profile_info.profile_image_url} alt="" />
              </div>
            </a>
          </div>
          <a href="//127.0.0.1/disconnect">
            <button className="log-button">Log Out?</button>
          </a>
        </div>
      )
    }
  }

  componentDidMount() {
    return this.displayPage()
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

