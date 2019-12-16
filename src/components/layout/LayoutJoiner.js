import React, { Component } from 'react';
import Header from './Header';
import MiniDrawer from './MiniDrawer';

export default function LayoutJoiner(loggedIn) {
  return (
    <div>
      <Header loggedIn={loggedIn} />
      <MiniDrawer />
    </div>
  )
}