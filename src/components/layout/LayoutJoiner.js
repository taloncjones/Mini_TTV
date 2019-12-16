import React, { Component } from 'react';
import Header from './Header';
import MiniDrawer from './MiniDrawer';

class LayoutJoiner extends Component {
  render() {
    return (
      <div>
        <Header loggedIn={this.props.loggedIn} />
        <MiniDrawer />
      </div >
    )
  }
}

export default LayoutJoiner;
