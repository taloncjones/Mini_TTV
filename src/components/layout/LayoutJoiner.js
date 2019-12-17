import React from 'react';
import Header from './Header';
import MiniDrawer from './MiniDrawer';

export default function LayoutJoiner({ loggedIn, profileInfo, streams, games, follows }) {
  return (
    <div>
      <Header loggedIn={loggedIn} profileInfo={profileInfo} />
      <MiniDrawer />
    </div>
  )
}