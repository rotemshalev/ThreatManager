import types from '../types';

export default function statusReducer(state = {}, action) {
  switch(action.type)  {
    case types.CHANGE_STATUS:
      return {
        ...state,
        status: action.payload.status,
      }

    default:
      return state;
  }
}