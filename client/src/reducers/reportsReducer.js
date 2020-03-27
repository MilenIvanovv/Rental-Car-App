import { ADD_REPORT } from '../constants/action-types';
import { MODIFY_REPORT } from '../constants/action-types';

export default (state = [], { type, payload }) => {
  switch (type) {
    case ADD_REPORT:
      return [payload, ...state];
    case MODIFY_REPORT:
      return state.map((x) => 
          x.reportId === payload.reportId
            ? { ...x, ...payload}
            : x
        );
    default:
      return state;
  }
};
