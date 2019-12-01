import React from 'react';
import { linkSync } from 'fs';

function Header() {
  return (
    <header style={headerStyle}>
      <h1>Mini TTV</h1>
      <Link style={linkStyle} to="/">Home</Link> | <Link style={linkStyle} to="/about">About</Link> | <Link style={linkStyle} to="127.0.0.1/login">Log In/Out</Link>
    </header>
  )
}

const headerStyle = {
  background: '#222',
  color: '#fff',
  textAlign: 'center',
  padding: '10px'
}

const linkStyle = {
  color: '#fff',
  textDecoration: 'none'
}

export default Header