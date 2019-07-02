import { combineReducers } from 'redux';

import loginState from './loginState';

const combinedReducers = combineReducers({
  loginState
});

export default combinedReducers;
