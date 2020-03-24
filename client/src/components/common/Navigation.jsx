import React from 'react';
import { Link } from 'react-router-dom';

export default function Navigation() {
  return (
    <nav className="navbar navbar-expand navbar-light bg-light mb-3">
      <Link className="navbar-brand" to="/">
        Navbar
      </Link>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/current-rentals">
              Dashboard
              {' '}
              <span className="sr-only">(current)</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/cars" data="cars_link">
              Cars
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/reports" data="cars_link">
              Reports
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
