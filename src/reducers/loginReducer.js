import { LOGIN, LOGOUT, PROFILE, AUTH_FAIL } from '../constants/ActionTypes';
const initialState = {
    user: {},
    isAuthenticated: false
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isAuthenticated: action.authenticated,
        user: action.data
      }
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: {}
      }
    case PROFILE:
      return {
        ...state, 
        isAuthenticated: action.authenticated
      }
    case AUTH_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        user: {}
      }
    default:
      return state;
  }
}