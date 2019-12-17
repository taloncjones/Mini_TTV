import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { IconButton } from '@material-ui/core';
import { Avatar } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
}));

function Header({ loggedIn, profileInfo }) {
  const classes = useStyles();
  let status;
  if(loggedIn) {
    status = <IconButton color="inherit"><Avatar alt={profileInfo.display_name} src={profileInfo.profile_image_url} /></IconButton>
  } else {
    status = <Button color="inherit">Log In</Button>
  }

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.grow}>
            Mini TwitchTV
            </Typography>
          <Link to="/monstercat">Monstercat</Link>
          <Link to="/login">
            {status}
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header