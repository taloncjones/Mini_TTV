import React from 'react'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import GameItem from './GameItem'
import StreamList from '../streams/StreamList';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  grow: {
    padding: theme.spacing(3),
    position: 'relative',
  },
  gameList: {
    height: '100%',
    overflow: 'auto',
  },
  overlay: {
    position: 'fixed',
    top: theme.spacing(8),
    bottom: '0',
    left: theme.spacing(7) + 1,
    right: '0',
    overflow: 'auto',
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: theme.zIndex.drawer - 1,
    '&::-webkit-scrollbar': {
      width: theme.spacing(1),
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: grey[900],
      borderRadius: theme.spacing(1),
    },
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
      <Grid container spacing={2} className={classes.gameList}>
        {games.map((game) => (
          <Grid item key={game.id} md={2} sm={3}>
            <GameItem key={game.id} game={game} showGameInfo={showGameInfo} />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}
