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
      <div className="stream-info">
        <img className="stream-profile" src={this.state.info.profile_image_url} alt="" />
      </div>
    )
  }
}

export default SteamInfo
