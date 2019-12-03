import React, { Component } from 'react'
import GameItem from './GameItem'

class TopGames extends Component {
  render() {
    console.log(this.props.games)
    return this.props.games.map((game) =>(
      <GameItem key={game.id} game={game} />
    ))
  }
}

export default TopGames
