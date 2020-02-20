import { SET_ALL_CARS } from '../constants/action-types';

// eslint-disable-next-line import/prefer-default-export
export const setCars = (cars) => ({
  type: SET_ALL_CARS,
  payload: cars,
});
