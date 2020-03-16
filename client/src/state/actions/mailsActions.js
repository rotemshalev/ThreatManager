import axios from 'axios';

import types from '../types';

export const fetchMailsSuccess = mails => {  
  return { type: types.FETCH_MAILS_SUCCESS, payload: { mails } }
}

export const fetchMailsFurtherSuccess = mails => {  
  return { type: types.FETCH_MAILS_FURTHER_SUCCESS, payload: { mails } }
}

export const fetchFailure = error => {  
  return { type: types.FETCH_FAILURE, payload: { error } }
}

export const selectMail = mail => {
  return { type: types.SELECT_MAIL, payload: { mail } }
}

export const clearSelectedMails = () => {
  return { type: types.CLEAR_SELECTED_MAILS }
}

export const deleteMailsSuccess = mails => {
  return { type: types.DELETE_MAILS_SUCCESS }
}

export const changeMailsStatusSuccess = (mails, status) => {
  return { type: types.CHANGE_MAILS_STATUS_SUCCESS, payload: { mails, status } }
}

export function fetchMails(mailsType) {
  return async (dispatch) => {
    try {
      let response = await axios.get(`http://localhost:5000/api/${mailsType}`);
      dispatch(fetchMailsSuccess(response.data));
    }
    catch (e) {
      dispatch(fetchFailure(e));
    }
  }
}

export function fetchMailsFurther(mailsType) {
  return async (dispatch) => {
    try {
      let response = await axios.get(`http://localhost:5000/api/${mailsType}/further`);
      dispatch(fetchMailsFurtherSuccess(response.data));
    }
    catch (e) {
      dispatch(fetchFailure(e));
    }
  }
}

export function deleteMails(mails) {
  return async (dispatch) => {
    try {
      let parsedMails = JSON.stringify(Object.keys(mails))
      await axios.delete(`http://localhost:5000/api/mails?mails=${parsedMails}`);
      dispatch(deleteMailsSuccess());
    }
    catch (e) {
      dispatch(fetchFailure(e));
    }
  }
}

export function changeMailsStatus(mails, status) {
  return async (dispatch) => {
    try {
      let parsedMails = JSON.stringify(Object.keys(mails));
      await axios.put(`http://localhost:5000/api/releaseRequests?mails=${parsedMails}&status=${status}`);
      dispatch(changeMailsStatusSuccess(parsedMails, status));
    }
    catch (e) {
      dispatch(fetchFailure(e));
    }
  }
}