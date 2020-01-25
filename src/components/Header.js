import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';

const Header = () => {
  return (
    <div className="ui secondary pointing menu">
      <div className="item">Streamer</div>
      <div className="menu right">
        <Link to="/">
          <div className="item">All Streams</div>
        </Link>
        <GoogleAuth />
      </div>
    </div>
  )
}

export default Header;
