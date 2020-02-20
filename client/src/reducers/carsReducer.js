import { SET_ALL_CARS } from '../constants/action-types';

export default (state = [], { type, payload }) => {
  switch (type) {
    case SET_ALL_CARS:
      return payload;
    default:
      return state;
  }
};
