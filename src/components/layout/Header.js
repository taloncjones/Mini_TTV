import React from 'react';
import { Link } from 'react-router-dom';

function Header({id}) {
  return (
    <header className="header">
      <h1>Mini TTV</h1>
      <p>{id}</p>
      <Link to="/">Home</Link> | <Link to="/about">About</Link> | <Link to="/login">{id ? 'Log Out' : 'Log In'}</Link>
    </header>
  )
}

export default Header