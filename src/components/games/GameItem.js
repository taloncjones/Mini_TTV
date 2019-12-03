import React, { Component } from 'react';
import axios from 'axios';

export class GameItem extends Component {
  state = {
    info: []
  }

  componentDidMount() {
    axios.get('//127.0.0.1/game_info/' + this.props.game.id)
      .then(res => this.setState({ info: res.data['data'][0] }))
  }

  getThumbnail(url) {
    var tmp = url.replace('{width}', '285')
    tmp = tmp.replace('{height}', '380')
    return tmp
  }

  getViewerCount(num) {
    return num >= 1000 ? (num / 1000).toFixed(1) + 'k' : num
  }

  render() {
    console.log(this.state.info)
    return (
      <div className="game-card">
        <a href={"//twitch.tv/directory/game/" + this.props.game.name} className="no-hover" >
          <img src={this.getThumbnail(this.props.game.box_art_url)} alt="" />
        </a>
      </div>
    )
  }
}

export default GameItem
