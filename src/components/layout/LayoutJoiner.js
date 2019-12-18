import React from 'react';
import Header from './Header';
import MiniDrawer from './MiniDrawer';

export default function LayoutJoiner({ loggedIn, profileInfo, history }) {
  return (
    <div>
      <Header loggedIn={loggedIn} profileInfo={profileInfo} />
      <MiniDrawer history={history} />
    </div>
  )
}