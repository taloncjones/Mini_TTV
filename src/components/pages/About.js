import React from 'react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <React.Fragment>
      <h1>About</h1>
      <p>This is my implementation of a mini TwitchTV player. The purpose of this project was to develop a backend to handle Twitch API calls, credentials, and JSON REST endpoint for a front-end component. The front end was initially static HTML, but I am developing a React front-end to learn and practice.</p>
      <p>Mini_TTV v1.0.0</p>
      <Link to="https://github.com/taloncjones/Mini_TTV">Github for Mini_TTV</Link>
    </React.Fragment>
  )
}
