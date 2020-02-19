import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Navigation from './components/Navigation';
import CarsPage from './components/CarsPage';
import CurrentRentals from './components/CurrentRentals';
import CheckoutPage from './components/checkoutPage/CheckoutPage';

class App extends Component {
  render() {
    return (
      <Router>
        <Navigation />
        <Switch>
          <Route path="/current-rentals">
            <CurrentRentals />
          </Route>
          <Route path="/cars">
            <CarsPage />
          </Route>
          <Route path="/checkouts">
            <CheckoutPage />
          </Route>
          <Route path="/">
            <h1>Home Page</h1>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
