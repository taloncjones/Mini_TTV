import React, { Component } from 'react'
import GameItem from './GameItem'

class TopGames extends Component {
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

export default TopGames
