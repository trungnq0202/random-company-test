import { loginStatus, actions } from "./login.constant";

const { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAIL, AUTH_LOGOUT } = actions;

const INITIAL_STATE = {
  account: {},
  loginStatus: loginStatus.notStart,
  token: null,
};

export default function loginReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        loginStatus: loginStatus.inProgress,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loginStatus: loginStatus.success,
        account: action.payload.account,
        token: action.payload.token,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        loginStatus: loginStatus.fail,
      };
    case AUTH_LOGOUT:
      return {
        ...state,
        loginStatus: loginStatus.notStart,
        token: null,
        account: null,
      };
    default:
      return state;
  }
}
