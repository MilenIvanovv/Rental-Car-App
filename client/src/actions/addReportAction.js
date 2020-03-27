import { ADD_REPORT } from '../constants/action-types';

// eslint-disable-next-line import/prefer-default-export
export const addReport = (report) => ({
  type: ADD_REPORT,
  payload: report,
});
