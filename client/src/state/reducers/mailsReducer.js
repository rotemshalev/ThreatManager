import { includes as _includes, cloneDeep as _cloneDeep } from 'lodash';

import types from '../types';

export default function mailsReducer(state = {}, action) {
  switch(action.type)  {
    case types.FETCH_MAILS_BEGIN:
      return {
        ...state,
        error: null
      }

    case types.FETCH_MAILS_SUCCESS:
      return {
        ...state,
        mails: action.payload.mails
      };

    case types.FETCH_MAILS_FURTHER_SUCCESS:
      let oldMails = _cloneDeep(state.mails);
      return {
        ...state,
        mails: oldMails.concat(action.payload.mails)
      };

    case types.FETCH_FAILURE:
      return {
        ...state,
        error: action.payload.error,
        mails: []
      };

    case types.DELETE_MAILS_SUCCESS:
      return {
        ...state,
        mails: state.mails.filter(m => {
          return !Object.keys(state.selectedMails).includes(m["Mail ID"])
        }),
        selectedMails: {}
      };

    case types.SELECT_MAIL:
      let mailId = action.payload.mail["Mail ID"];
      let selectedMails = Object.assign({}, state.selectedMails);
      if (selectedMails[mailId]) {
        delete selectedMails[mailId];
      }
      else {
        selectedMails[mailId] = true;
      }
      return {
        ...state,
        selectedMails,
        lastMailSelected: action.payload.mail
      }
      
    case types.CLEAR_SELECTED_MAILS:
      return {
        ...state,
        selectedMails: {}
      }

    case types.CHANGE_MAILS_STATUS_SUCCESS:
      let newMails = Object.assign([], state.mails);
      let { mails: changedMails, status } = action.payload;
      newMails.forEach(mail => {
        _includes(changedMails, mail["Mail ID"]) === true && (mail["Mail Status"] = status);
      })
      return {
        ...state,
        mails: newMails
      }

    default:
      return state;
  }
}