import React, { Component } from 'react'
import GameItem from './GameItem'

class GameList extends Component {
  render() {
    return (
      <div className="game-list">
        {this.props.games.map((game) => (
          <GameItem key={game.id} game={game} />
        ))}
      </div>
    )
  }
}

export default GameList
