import React from 'react';
import Header from './Header';
import MiniDrawer from './MiniDrawer';

export default function LayoutJoiner({ loggedIn, profileInfo, history, pageName, streamName }) {
  return (
    <div>
      <Header loggedIn={loggedIn} profileInfo={profileInfo} streamName={streamName} />
      <MiniDrawer history={history} streamName={streamName}/>
    </div>
  )
}