import React from 'react'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
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
    padding: theme.spacing(5, 1),
    color: theme.palette.text.primary,
  },
}));

export default function Welcome() {
  const classes = useStyles();

  return (
    <div className={classes.page}>
      <Grid container justify="center" alignItems="center" className={classes.page}>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <Typography variant="h4">
              Welcome to Mini TwitchTV!
            </Typography>
          </Paper>
        </Grid>
      </Grid>
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
