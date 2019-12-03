import React, { Component } from 'react'

export class GameItem extends Component {
  getThumbnail(url) {
    var tmp = url.replace('{width}', '285')
    tmp = tmp.replace('{height}', '380')
    return tmp
  }

  render() {
    console.log(this.props.game)
    return (
      <div>
        <img src={this.getThumbnail(this.props.game.box_art_url)} alt="" />
      </div>
    )
  }
}

export default GameItem
