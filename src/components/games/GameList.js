import React from 'react'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import GameItem from './GameItem'

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  }
}))

export default function GameList({ games }) {
  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <Grid container spacing={2}>
        {games.map((game) => (
          <Grid item key={game.id} sm={3} xs={6}>
            <GameItem key={game.id} game={game} />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}
