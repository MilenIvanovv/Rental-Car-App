import { SET_ALL_RENTALS } from '../constants/action-types';

export default (state = [], { type, payload }) => {
  switch (type) {
    case SET_ALL_RENTALS:
      return payload;
    default:
      return state;
  }
};
