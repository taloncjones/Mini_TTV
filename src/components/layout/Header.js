import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <h1>Mini TTV</h1>
      <Link to="/">Home</Link> | <Link to="/about">About</Link> | <Link to={"//127.0.0.1/login"} target="_blank">Log In/Out</Link>
    </header>
  )
}

export default Header