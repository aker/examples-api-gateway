import { combineReducers } from 'redux';

import { account } from './account';


const uiReducer = combineReducers({
  account
});

export default uiReducer;