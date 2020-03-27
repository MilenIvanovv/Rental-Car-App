import { combineReducers } from 'redux';
import carsReducer from './carsReducer';
import rentalsReducer from './rentalsReducer';
import { reducer as toastrReducer } from 'react-redux-toastr';
import rentCarForm from './rentCarFormReducer';
import reportReducer from './reportsReducer';

export default combineReducers({
  cars: carsReducer,
  rentals: rentalsReducer,
  toastr: toastrReducer,
  form: rentCarForm,
  reports: reportReducer,
});
