/**
 * Created by andrew on 25/02/16.
 */
import { combineReducers } from 'redux';

import { userReducer } from './user';

const authStateReducer = combineReducers({
  user: userReducer
});

export default authStateReducer;