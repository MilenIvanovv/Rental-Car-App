import { SET_RENT_CAR_FORM_IS_VALID } from '../constants/action-types';
import { SET_RENT_CAR_RESET } from '../constants/action-types';
import { MODIFY_RENT_CAR_FORM } from '../constants/action-types';
import moment from 'moment';

const ceilHour = { hours: moment().hours() + 1, minutes: 0 };

const initialState = {
  firstName: {
    value: '',
    error: 'not touched',
  },
  lastName: {
    value: '',
    error: 'not touched',
  },
  age: {
    value: '',
    error: 'not touched',
  },
  fromDate: {
    value: moment().set(ceilHour),
    error: '',
  },
  returnDate: {
    value: moment().set(ceilHour).add(1, 'days'),
    error: '',
  },
  isFormValid: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case MODIFY_RENT_CAR_FORM:
      return payload;

    case SET_RENT_CAR_FORM_IS_VALID:
      return { ...state, isFormValid: payload };

    case SET_RENT_CAR_RESET:
      return initialState;

    default:
      return state;
  }
};
