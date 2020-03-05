import { combineReducers } from 'redux';
import carsReducer from './carsReducer';
import rentalsReducer from './rentalsReducer';
import { reducer as toastrReducer } from 'react-redux-toastr';

export default combineReducers({ cars: carsReducer, rentals: rentalsReducer, toastr:toastrReducer });
