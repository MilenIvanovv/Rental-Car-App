import { GET_ALL_CARS } from '../constants/action-types';

export default (state = {}, { type, payload }) => {
  switch (type) {
    case GET_ALL_CARS:
      return payload;
    default:
      return state;
  }
};
