import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

var mini_ttv_api = require('../Url.json')['url'];

const useStyles = makeStyles(theme => ({
  button: {
    marginTop: theme.spacing(1),
  },
  page: {
    textAlign: 'center',
  },
  paper: {
    maxWidth: '50%',
    margin: '0 auto',
    textAlign: 'center',
    backgroundColor: theme.palette.secondary[900],
    padding: theme.spacing(1),
    color: theme.palette.text.primary,
    position: 'relative',
  },
  profileImage: {
    display: 'block',
    borderRadius: '50%',
  },
  profileBox: {
    overflow: 'hidden',
    width: theme.spacing(10),
    margin: '0 auto',
  },
  profileContainer: {
    flex: '0 0 auto',
  },
  user: {
    color: theme.palette.text.primary,
    "&:hover": {
      color: theme.palette.primary.main,
    }
  },
}));

export default function LogIn({ profileInfo }) {
  const classes = useStyles();

  const displayPage = () => {
    let link;

    if (profileInfo.length === 0) {
      link = '//' + mini_ttv_api + '/login';
      return (
        <Paper className={classes.paper}>
          <Typography variant="body1">
            Logging in will allow you to view your followed channels.
          </Typography>
          <Button
            href={link}
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Log In to Twitch TV!
          </Button>
        </Paper>
      )
    } else {
      link = '//' + mini_ttv_api + '/disconnect';
      return (
        <Paper className={classes.paper}>
          <Typography variant="h6">
            Welcome
          </Typography>
          <Link
            variant="body1"
            href={"/" + profileInfo.display_name} className={classes.user}
          >
            {profileInfo.display_name}
          </Link>
          <div className={classes.profileContainer}>
            <div className={classes.profileBox}>
              <Link href={"/" + profileInfo.display_name}>
                <img className={classes.profileImage} src={profileInfo.profile_image_url} alt="" />
              </Link>
            </div>
          </div>
          <Button
            href={link}
            variant="contained"
            color="primary"
            className={classes.button}
          >
            Log Out?
          </Button>
        </Paper>
      )
    }
  }

  return (
    <div className={classes.page}>
      {displayPage()}
    </div>
  )
}