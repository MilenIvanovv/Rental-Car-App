import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Navigation from './components/common/Navigation';
import CarsPage from './components/carsPage/CarsPage';
import CurrentRentals from './components/CurrentRentalsPage';
import CheckoutPage from './components/checkoutPage/CheckoutPage';
import combinedReducer from './reducers/index';

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import NotFoundPage from './components/common/NotFoundPage';

const store = createStore(combinedReducer,
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navigation />
        <Switch>
          <Route path="/current-rentals">
            <CurrentRentals />
          </Route>
          <Route path="/cars/:carId">
            <CheckoutPage />
          </Route>
          <Route path="/cars">
            <CarsPage />
          </Route>
          <Route path="/not-found">
            <NotFoundPage />
          </Route>
          <Route path="/">
            <h1>Home Page</h1>
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}
