import React from 'react'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  button: {
    marginTop: theme.spacing(1),
  },
  drawer: {
    top: 0,
    left: 0,
    position: 'absolute',
  },
  login: {
    top: 0,
    right: 0,
    position: 'absolute',
  },
  toggle: {
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  page: {
    textAlign: 'center',
    position: 'relative',
    height: '100%',
    width: '100%',
  },
  paper: {
    backgroundColor: theme.palette.secondary[900],
    padding: theme.spacing(1),
    color: theme.palette.text.primary,
  },
  welcome: {
    width: '50%',
    height: '25%',
    margin: '0 auto',
    textAlign: 'center',
    top: '50%',
    left: '50%',
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
  },
}));

export default function Welcome() {
  const classes = useStyles();

  return (
    <div className={classes.page}>
      <Paper className={`${classes.paper} ${classes.welcome}`}>
        <Typography variant="h4" className={classes.page}>
          <span className={classes.welcome}>
            Welcome!
          </span>
        </Typography>
      </Paper>
      <Paper className={classes.drawer}>
        Test
      </Paper>
      <Paper className={classes.login}>
        Test
      </Paper>
      <Paper className={classes.toggle}>
        Test
      </Paper>
    </div>
  )
}
