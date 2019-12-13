import React from 'react';
import { Link } from 'react-router-dom';

function Header({loggedIn}) {
  return (
    <header className="header">
      <h1>Mini TTV</h1>
      <Link to="/">Home</Link> | <Link to="/about">About</Link> | <Link to="/login">{loggedIn ? 'Log Out' : 'Log In'}</Link>
    </header>
  )
}

export default Header