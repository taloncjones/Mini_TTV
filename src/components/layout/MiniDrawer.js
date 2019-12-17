import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import MovieIcon from '@material-ui/icons/Movie';
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
  icon: {
    height: '1em',
    width: '1em',
  }
}));

export default function MiniDrawer() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [letOpen, setChecked] = React.useState(true);

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
    setChecked(!letOpen);
    if(!letOpen) {
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
        >
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <ListItemText>Home</ListItemText>
        </ListItem>
        <ListItem
          button key="Games"
          selected={selectedIndex === 1}
          onClick={event => handleListItemClick(event, 1)}
        >
          <ListItemIcon><GamesIcon /></ListItemIcon>
          <ListItemText>Top Games</ListItemText>
        </ListItem>
        <ListItem
          button key="Streams"
          selected={selectedIndex === 2}
          onClick={event => handleListItemClick(event, 2)}
        >
          <ListItemIcon><MovieIcon /></ListItemIcon>
          <ListItemText>Top Streams</ListItemText>
        </ListItem>
        <ListItem
          button key="Favorites"
          selected={selectedIndex === 3}
          onClick={event => handleListItemClick(event, 3)}
        >
          <ListItemIcon><FavoriteIcon /></ListItemIcon>
          <ListItemText>My Follows</ListItemText>
        </ListItem>
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
        >
          <ListItemIcon><InfoIcon /></ListItemIcon>
          <ListItemText>About</ListItemText>
        </ListItem>
      </List>
    </Drawer>
  );
}
