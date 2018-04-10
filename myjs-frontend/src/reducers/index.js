/**
 * Created by andrew on 18/03/16.
 */
import { combineReducers } from 'redux';

import authStateReducer from './auth';

const mainReducer = combineReducers({
  auth:   authStateReducer
});

export default mainReducer;