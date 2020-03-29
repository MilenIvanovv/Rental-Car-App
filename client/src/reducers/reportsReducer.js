import { MODIFY_REPORT } from '../constants/action-types';

export default (state = [], { type, payload }) => {
  switch (type) {
    case MODIFY_REPORT:
      let found = false;
      
      const updated = state.map((x) => 
      x.reportId === payload.reportId
      ? (found = true, { ...x, ...payload })
      : x);
      
      // if no report with given id is found, new one is created
      return !found ? [{data: [], loading: false, ...payload}, ...state] : updated;
    default:
      return state;
  }
};
