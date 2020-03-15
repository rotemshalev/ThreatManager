import { combineReducers } from 'redux';
import mailsReducer from './mailsReducer';
import statusReducer from './statusReducer';
import searchReducer from './searchReducer';

export default combineReducers({
  mailsReducer,
  searchReducer,
  statusReducer
});