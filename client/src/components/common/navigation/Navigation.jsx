import React from 'react';
import { NavLink } from 'react-router-dom';
import { Container, Row, Dropdown } from 'react-bootstrap';
import logo from '../../../assets/IDrive logo.png';
import './navigation.css';

export default function Navigation() {
  return (
    <div className="navbar-container mb-3">
      <Container>
        <Row>
          <nav className="navbar navbar-expand navbar-light navbar-white">
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
                  <NavLink className="nav-link" to="/cars" data="cars_link">
                    Cars
                  </NavLink>
                </li>
                <li className="nav-item">
                  <Dropdown>
                    <Dropdown.Toggle variant="" id="dropdown-basic">
                      Reports
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <div className="dropdown-item">
                        <NavLink className="nav-link" to="/reports-tables">
                          Tables
                        </NavLink>
                      </div>
                      <div className="dropdown-item">
                        <NavLink className="nav-link" to="/reports-graphs">
                          Charts
                        </NavLink>
                      </div>
                    </Dropdown.Menu>
                  </Dropdown>

                </li>
              </ul>
            </div>
          </nav>
        </Row>
      </Container>
    </div>
  );
}
