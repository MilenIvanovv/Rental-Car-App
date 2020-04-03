import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/IDrive logo.png';

export default function Navigation() {
  return (
    <nav className="navbar navbar-expand navbar-light navbar-white mb-3">
      <NavLink className="navbar-brand" to="/">
        <img src={logo} className="logo" alt="logo" />
      </NavLink>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/current-rentals">
              Dashboard
              {' '}
              <span className="sr-only">(current)</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/cars" data="cars_NavLink">
              Cars
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/reports" data="cars_NavLink">
              Reports
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
