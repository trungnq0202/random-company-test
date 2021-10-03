import fetch from "isomorphic-fetch";
import { push, replace } from "connected-react-router";
import { actions } from "./login.constant";

const { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAIL, AUTH_LOGOUT } = actions;

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("account");
  return {
    type: AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const tryAutoLoggingIn = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const payload = {
          account: JSON.parse(localStorage.getItem("account")),
          token: localStorage.getItem("token"),
        };
        dispatch({ type: LOGIN_SUCCESS, payload: payload });
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
        dispatch(replace("/user-management"));
      }
    }
  };
};

export const login = (dispatch) => {
  return async (username, password) => {
    dispatch({ type: LOGIN_START });

    const response = await fetch("http://localhost:8080/api/admin/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
    const result = await response.json();
    if (result.error) {
      dispatch({ type: LOGIN_FAIL });
    } else {
      const expirationDate = new Date(
        new Date().getTime() + result.expiresIn * 1000
      );
      localStorage.setItem("token", result.token);
      localStorage.setItem("expirationDate", expirationDate);
      localStorage.setItem("account", JSON.stringify(result.admin));
      const payload = {
        account: result.admin,
        token: result.token,
      };
      dispatch({ type: LOGIN_SUCCESS, payload: payload });
      dispatch(checkAuthTimeout(result.expiresIn));
      dispatch(replace("/user-management"));
    }
  };
};
