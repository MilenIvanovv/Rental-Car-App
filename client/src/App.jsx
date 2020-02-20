import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navigation from './components/Navigation';
import CarsPage from './components/CarsPage';
import CurrentRentals from './components/CurrentRentals';
import CheckoutPage from './components/checkoutPage/CheckoutPage';

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

export default function App() {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route path="/current-rentals">
          <CurrentRentals />
        </Route>
        <Route path="/cars/:id">
          <CheckoutPage />
        </Route>
        <Route path="/cars">
          <CarsPage />
        </Route>
        <Route path="/">
          <h1>Home Page</h1>
        </Route>
      </Switch>
    </Router>
  );
}
