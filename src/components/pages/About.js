import React from 'react';
import Button from '@material-ui/core/Button';

export default function About() {
  return (
    <div className="about-page">
      <div className="about-container">
        <h1>About</h1>
        <p>This is my implementation of a mini TwitchTV player. The purpose of this project was to develop a back-end to handle Twitch API calls, credentials, and JSON REST endpoint for a front-end component. The front end was initially static HTML, but I am developing a React front-end to learn and practice.</p>
        <p>Mini_TTV v1.0.0</p>
        <Button href="//www.github.com/taloncjones/Mini_TTV" target="_blank" className="no-hover" variant="outlined" color="inherit">Click Here to View GitHub for Mini_TTV</Button>
      </div>
    </div>
  )
}
