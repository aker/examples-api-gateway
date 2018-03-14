/**
 * Created by andrew on 18/03/16.
 */
import { combineReducers } from 'redux';

import uiReducer from './ui'

const mainReducer = combineReducers({
  ui: uiReducer
});

export default mainReducer;