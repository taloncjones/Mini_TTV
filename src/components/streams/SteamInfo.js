import React from 'react';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  info: {
    marginTop: theme.spacing(.5),
    marginBottom: theme.spacing(.5),
    color: theme.palette.text.primary,
    textAlign: 'left',
  },
  profileImage: {
    display: 'block',
    borderRadius: '50%',
  },
  profileBox: {
    overflow: 'hidden',
    width: theme.spacing(6),
  },
  profileContainer: {
    marginRight: theme.spacing(1),
    flex: '0 0 auto',
  },
  text: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    color: theme.palette.text.primary,
    "&:hover": {
      color: theme.palette.primary.main,
    },
    fontSize: '.9rem',
  },
  textMinor: {
    color: theme.palette.text.secondary,
    fontSize: '.7rem',
  }
}));

export default function StreamInfo({ info, game, title }) {
  const classes = useStyles();

  return (
    <Grid item container className={classes.info} xs={12}>
      <Grid item className={classes.profileContainer} xs>
        <div className={classes.profileBox}>
          <Link href={"/" + info.display_name}>
            <img className={classes.profileImage} src={info.profile_image_url} alt="" />
          </Link>
        </div>
      </Grid>
      <Grid item container zeroMinWidth xs>
        <Grid item xs={12}>
          <Link href={"/" + info.display_name}>
            <div className={classes.text}>
              {title}
            </div>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Link href={"/" + info.display_name}>
            <div className={`${classes.text} ${classes.textMinor}`}>
              {info.display_name}
            </div>
          </Link>
        </Grid>
        <Grid item xs={12}>
          <Link href={"//twitch.tv/directory/game/" + game.name}>
            <div className={`${classes.text} ${classes.textMinor}`}>
              {game.name ? game.name : ''}
            </div>
          </Link>
        </Grid>
      </Grid>
    </Grid>
  )
}