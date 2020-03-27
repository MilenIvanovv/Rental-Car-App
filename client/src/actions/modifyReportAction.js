import { MODIFY_REPORT } from '../constants/action-types';

// eslint-disable-next-line import/prefer-default-export
export const modifyReport = (report) => ({
  type: MODIFY_REPORT,
  payload: report,
});
