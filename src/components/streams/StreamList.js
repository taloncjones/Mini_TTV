import React from 'react'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import StreamItem from './StreamItem'

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
}));

export default function StreamList({ streams }) {
  const classes = useStyles();

  return (
    <div className={classes.grow}>
      <Grid container spacing={2}>
        {streams.map((stream) => (
          <Grid item key={stream.id} sm={3} xs={6}>
            <StreamItem key={stream.id} stream={stream} />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}
