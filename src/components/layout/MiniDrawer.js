import React from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import VideocamIcon from '@material-ui/icons/Videocam';
import GamesIcon from '@material-ui/icons/Games';
import FavoriteIcon from '@material-ui/icons/Favorite';
import InfoIcon from '@material-ui/icons/Info';
import { Switch } from '@material-ui/core';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  hide: {
    display: 'none',
  },
  drawer: {
    position: 'absolute',
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(7) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  footer: {
    marginTop: 'auto',
  },
}));

export default function MiniDrawer({ streamName }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [letOpen, setChecked] = React.useState(true);

  React.useEffect(() => {
    let checked = JSON.parse(localStorage.getItem('letOpen'))
    setChecked(checked)
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const handleDrawerToggle = () => {
    localStorage.setItem('letOpen', !letOpen)
    setChecked(!letOpen);
    if (!letOpen) {
      handleDrawerOpen()
    } else {
      handleDrawerClose()
    }
  }

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
      onMouseOver={letOpen ? handleDrawerOpen : handleDrawerClose}
      onMouseOut={handleDrawerClose}
    >
      <div className={classes.toolbar} />
      <List>
        <ListItem
          button key="Home"
          onClick={event => handleListItemClick(event, 0)}
          component={Link} to={streamName}
        >
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText>Home</ListItemText>
        </ListItem>
        <ListItem
          button key="Games"
          selected={selectedIndex === 1}
          onClick={event => handleListItemClick(event, 1)}
          component={Link} to="/games"
        >
          <ListItemIcon><GamesIcon /></ListItemIcon>
          <ListItemText>Top Games</ListItemText>
        </ListItem>
        <ListItem
          button key="Streams"
          selected={selectedIndex === 2}
          onClick={event => handleListItemClick(event, 2)}
          component={Link} to="/streams"
        >
          <ListItemIcon><VideocamIcon /></ListItemIcon>
          <ListItemText>Top Streams</ListItemText>
        </ListItem>
        <ListItem
          button key="Favorites"
          selected={selectedIndex === 3}
          onClick={event => handleListItemClick(event, 3)}
          component={Link} to="/following"
        >
          <ListItemIcon><FavoriteIcon /></ListItemIcon>
          <ListItemText>My Follows</ListItemText>
        </ListItem>
      </List>
      <List className={classes.footer}>
        <Divider />
        <ListItem
          button key="Drawer"
        >
          <ListItemIcon>
            <Switch
              edge="start"
              size="small"
              color="primary"
              onChange={handleDrawerToggle}
              checked={letOpen}
            />
          </ListItemIcon>
          <ListItemText>Enable Sidebar</ListItemText>
        </ListItem>
        <ListItem
          button key="About"
          onClick={event => handleListItemClick(event, 4)}
          component={Link} to='/about'
        >
          <ListItemIcon><InfoIcon /></ListItemIcon>
          <ListItemText>About</ListItemText>
        </ListItem>
      </List>
    </Drawer>
  );
}
