import React from 'react'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import GameItem from './GameItem'

const useStyles = makeStyles(theme => ({
  grow: {
    padding: theme.spacing(3),
  }
}))

export default function GameList({ games }) {
  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <Grid container spacing={2}>
        {games.map((game) => (
          <Grid item key={game.id} md={2} sm={3}>
            <GameItem key={game.id} game={game} />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}
