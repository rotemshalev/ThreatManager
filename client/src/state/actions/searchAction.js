import types from '../types';

export const changeSearch = search => {
  return { type: types.CHANGE_SEARCH, payload: { search } }
}