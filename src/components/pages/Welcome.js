import React from 'react'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
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
  tutorial: {
    backgroundColor: theme.palette.secondary[900],
    padding: theme.spacing(3, 1),
    color: theme.palette.text.primary,
    maxWidth: '25%',
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
        <Paper className={`${classes.drawer} ${classes.tutorial}`}>
          <Typography component="div">
            <Grid container alignItems="center">
              <Grid item xs={1}>
                <ChevronLeftIcon />
              </Grid>
              <Grid item xs={11}>
                This bar to the left holds the navigation stuff. Hover over it and see what's there!
              </Grid>
            </Grid>
          </Typography>
        </Paper>
      </Box>
      <Box display={tutorial === 2 ? "block" : "none"}>
        <Paper className={`${classes.toggle} ${classes.tutorial}`}>
          <Typography component="div">
            <Grid container alignItems="center">
              <Grid item xs={1}>
                <ChevronLeftIcon />
              </Grid>
              <Grid item xs={11}>
                This button toggles if the bar will expand or not. Turn it off if you know your way around.
              </Grid>
            </Grid>
          </Typography>
        </Paper>
      </Box>
      <Box display={tutorial === 3 ? "block" : "none"}>
        <Paper className={`${classes.login} ${classes.tutorial}`}>
          <Typography component="div">
            <Grid container direction="row-reverse" alignItems="flex-start">
              <Grid item md={1} container>
                <Grid item xs={12}>
                  <KeyboardArrowUpIcon />
                </Grid>
              </Grid>
              <Grid item md={11} container spacing={2}>
                <Grid item>
                  If you know a TwitchTV channel, you can go to it directly with this search bar!
                </Grid>
                <Grid item>
                  You can also log in to see your followed channels!
                </Grid>
              </Grid>
            </Grid>
          </Typography>
        </Paper>
      </Box>
    </div>
  )
}
