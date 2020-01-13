import React from 'react'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
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
  const [tutorial, setTutorial] = React.useState(0);

  const handleNextTutorialClick = (event, index) => {
    setTutorial(index);
    if (index === 4) {
      window.location = '/streams';
    }
  };

  return (
    <div className={classes.page}>
      <Grid container justify="center" alignItems="center" className={classes.page}>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <Typography variant="h4">
              Welcome to Mini TwitchTV!
            </Typography>
            <Box display={tutorial === 0 ? "block" : "none"}>
              <Button onClick={event => handleNextTutorialClick(event, 1)}>Show me around!</Button>
            </Box>
            <Box display={tutorial === 1 ? "block" : "none"}>
              <Button onClick={event => handleNextTutorialClick(event, 2)}>And?</Button>
            </Box>
            <Box display={tutorial === 2 ? "block" : "none"}>
              <Button onClick={event => handleNextTutorialClick(event, 3)}>Neat!</Button>
            </Box>
            <Box display={tutorial === 3 ? "block" : "none"}>
              <Button onClick={event => handleNextTutorialClick(event, 4)}>Cool! Let's watch stuff!</Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Box display={tutorial === 1 ? "block" : "none"}>
        <Paper className={classes.drawer}>
          Test
        </Paper>
      </Box>
      <Box display={tutorial === 2 ? "block" : "none"}>
        <Paper className={classes.login}>
          Test
        </Paper>
      </Box>
      <Box display={tutorial === 3 ? "block" : "none"}>
        <Paper className={classes.toggle}>
          Test
        </Paper>
      </Box>
    </div>
  )
}
