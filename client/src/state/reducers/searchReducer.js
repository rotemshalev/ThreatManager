import types from '../types';

export default function searchReducer(state = {}, action) {
  switch(action.type)  {
    case types.CHANGE_SEARCH:
      return {
        ...state,
        search: action.payload.search,
      }

    default:
      return state;
  }
}