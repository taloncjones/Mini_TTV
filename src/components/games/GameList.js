import React from 'react'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import GameItem from './GameItem'
import StreamList from '../streams/StreamList';

const useStyles = makeStyles(theme => ({
  grow: {
    padding: theme.spacing(3),
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: theme.zIndex.drawer - 1,
    display: 'none',
  }
}))

export default function GameList({ games }) {
  const classes = useStyles();
  const [gameInfo, setGameInfo] = React.useState([]);

  return (
    <div className={classes.grow}>
      <div className={classes.overlay} id="overlay">
        <StreamList class={classes.overlay} streams={gameInfo} />
      </div>
      <Grid container spacing={2}>
        {games.map((game) => (
          <Grid item key={game.id} md={2} sm={3}>
            <GameItem key={game.id} game={game} setGameInfo={setGameInfo} />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}
