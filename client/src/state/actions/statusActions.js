import types from '../types';

export const changeStatus = status => {
  return { type: types.CHANGE_STATUS, payload: { status } }
}