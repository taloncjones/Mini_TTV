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
  fixed: {
    overflow: 'hidden',
  },
  overlay: {
    position: 'fixed',
    top: '0',
    bottom: '0',
    left: '0',
    right: '0',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: theme.zIndex.drawer - 1,
  }
}))

export default function GameList({ games }) {
  const classes = useStyles();
  const [gameInfo, setGameInfo] = React.useState([]);
  const [overlay, setOverlay] = React.useState(false);

  const overlayOn = () => {
    setOverlay(true);
  }

  const overlayOff = () => {
    setOverlay(false);
  }

  const showGameInfo = (info) => {
    setGameInfo(info);
    overlayOn();
  }

  return (
    <div className={classes.grow}>
      {overlay ?
      <div className={classes.overlay} onClick={overlayOff}>
        <StreamList streams={gameInfo} />
      </div>
      : '' }
      <Grid container spacing={2} className={(overlay ? classes.fixed : '')}>
        {games.map((game) => (
          <Grid item key={game.id} md={2} sm={3}>
            <GameItem key={game.id} game={game} showGameInfo={showGameInfo} />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}
