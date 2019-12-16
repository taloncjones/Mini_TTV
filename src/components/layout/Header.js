import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

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

function Header(loggedIn) {
  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" className={classes.grow}>
            Mini TwitchTV
            </Typography>
          <Link to="/">Home</Link> | <Link to="/about">About</Link> | <Link to="/login">{loggedIn ? 'Log Out' : 'Log In'}</Link><br />
          <Link to="/monstercat">Monstercat</Link>
          <Link to="/login">
            <Button color="inherit">{loggedIn ? 'Log Out' : 'Log In'}</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Header