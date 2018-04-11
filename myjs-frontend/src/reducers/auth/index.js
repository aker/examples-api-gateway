/**
 * Created by andrew on 25/02/16.
 */
import { combineReducers } from 'redux';

import { signUpReducer } from './signup';
import { userReducer } from './user';

const authStateReducer = combineReducers({
  signUp: signUpReducer,
  user: userReducer
});

export default authStateReducer;