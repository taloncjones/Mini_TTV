import React, { Component } from 'react';
import Header from './Header';
import MiniDrawer from './MiniDrawer';

class LayoutJoiner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  drawerOpen = () => {
    this.setState({ open: true });
  };

  drawerClose = () => {
    this.setState({ open: false })
  };

  render() {
    var open = this.state.open;

    return (
      <div>
        <Header loggedIn={this.props.loggedIn}
          open={open}
          drawerOpen={this.drawerOpen}
          drawerClose={this.drawerClose}
        />
        <MiniDrawer
          open={open}
          drawerOpen={this.drawerOpen}
          drawerClose={this.drawerClose}
        />
      </div >
    )
  }
}

export default LayoutJoiner;
