import React from 'react';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  button: {
    marginTop: theme.spacing(1),
  },
  page: {
    textAlign: 'center',
    padding: theme.spacing(3),
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
}));

export default function About() {
  const classes = useStyles();

  return (
    <div className={classes.page}>
      <Paper className={classes.paper}>
        <Typography variant="h4">About</Typography>
        <Typography>
          This is my implementation of a mini TwitchTV player. The purpose of this project was to develop a back-end to handle Twitch API calls, credentials, and JSON REST endpoint for a front-end component. The front end was initially static HTML, but I am developing a React front-end to learn and practice.
        </Typography>
        <Typography className={classes.button}>
          Mini_TTV v1.0.0
        </Typography>
        <Button
          href="//www.github.com/taloncjones/Mini_TTV"
          target="_blank"
          variant="outlined"
          color="primary"
          className={classes.button}
        >
          Click Here to View GitHub for Mini_TTV
        </Button>
      </Paper>
    </div>
  )
}
