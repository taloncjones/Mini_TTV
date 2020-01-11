import React from 'react';
import Header from './Header';
import MiniDrawer from './MiniDrawer';

export default function LayoutJoiner({ loggedIn, profileInfo, history, pageName }) {
  return (
    <div>
      <Header loggedIn={loggedIn} profileInfo={profileInfo} pageName={pageName} />
      <MiniDrawer history={history} />
    </div>
  )
}