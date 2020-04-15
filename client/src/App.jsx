import React from 'react';
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import ReduxToastr from 'react-redux-toastr';
import Navigation from './components/common/navigation/Navigation';
import CarsPage from './components/carsPage/CarsPage';
import CurrentRentals from './components/CurrentRentalsPage';
import CheckoutPage from './components/checkoutPage/CheckoutPage';
import combinedReducer from './reducers/index';
import NotFoundPage from './components/common/NotFoundPage';
import ReportsPage from './components/reportsPage/ReportsPage';

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import 'react-image-lightbox/style.css';

const store = createStore(combinedReducer,
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navigation />
        <Switch>
          <Route exact path="/">
            <Redirect to="/cars" />
          </Route>
          <Route path="/current-rentals">
            <CurrentRentals />
          </Route>
          <Route path="/cars/:carId">
            <CheckoutPage />
          </Route>
          <Route path="/cars">
            <CarsPage />
          </Route>
          <Route path="/reports-tables">
            <ReportsPage />
          </Route>
          <Route path="/reports-graphs">
            <ReportsPage />
          </Route>
          <Route path="/not-found">
            <NotFoundPage />
          </Route>
        </Switch>
      </Router>
      <ReduxToastr
        timeOut={4000}
        newestOnTop={false}
        preventDuplicates
        getState={(state) => state.toastr} // This is the default
        transitionIn="fadeIn"
        transitionOut="fadeOut"
        progressBar
        closeOnToastrClick />
    </Provider>
  );
}
