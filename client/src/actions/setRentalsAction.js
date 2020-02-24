import { SET_ALL_RENTALS } from '../constants/action-types';

// eslint-disable-next-line import/prefer-default-export
export const setRentals = (rentals) => ({
  type: SET_ALL_RENTALS,
  payload: rentals,
});
