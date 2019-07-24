import { CHANGE_LOGIN_STATUS } from '../actions/';
const INITIAL_STATE = {
  loggedIn: false,
  user: undefined
};

export default loginState = (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case CHANGE_LOGIN_STATUS:
      const updatedState = {...state, ...action.payload};
      return updatedState;
    default:
      return state;
  }
};
