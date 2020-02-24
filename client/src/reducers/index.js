import { combineReducers } from 'redux';
import carsReducer from './carsReducer';
import rentalsReducer from './rentalsReducer';

export default combineReducers({ cars: carsReducer, rentals: rentalsReducer });
