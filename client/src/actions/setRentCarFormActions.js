import { MODIFY_RENT_CAR_FORM } from '../constants/action-types';
import { SET_RENT_CAR_FORM_IS_VALID } from '../constants/action-types';
import { SET_RENT_CAR_RESET } from '../constants/action-types';

const modifyForm = (value) => ({
  type: MODIFY_RENT_CAR_FORM,
  payload: value,
});

const isFormValid = (value) => ({
  type: SET_RENT_CAR_FORM_IS_VALID,
  payload: value,
});

const resetForm = (value) => ({
  type: SET_RENT_CAR_RESET,
});

const setRentalCarForm = {
  modifyForm,
  isFormValid,
  resetForm,
}

export default setRentalCarForm;

