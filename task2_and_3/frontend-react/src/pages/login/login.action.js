import { replace } from "connected-react-router";
import { actions } from "./login.constant";
import axios from "../../axios-request";

const { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAIL, AUTH_LOGOUT } = actions;

export const logout = () => {
  const token = localStorage.getItem("token");
  return async (dispatch) => {
    await axios.post("/admin/logout", localStorage.getItem("account"), {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("account");

    dispatch({ type: AUTH_LOGOUT });
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
  const token = localStorage.getItem("token");
  return async (username, password) => {
    dispatch({ type: LOGIN_START });
    axios
      .post(
        "/admin/auth",
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        const expirationDate = new Date(
          new Date().getTime() + result.data.expiresIn * 1000
        );
        localStorage.setItem("token", result.data.token);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("account", JSON.stringify(result.data.account));
        const payload = {
          account: result.data.account,
          token: result.data.token,
        };
        dispatch({ type: LOGIN_SUCCESS, payload: payload });
        dispatch(checkAuthTimeout(result.data.expiresIn));
        dispatch(replace("/user-management"));
      })
      .catch((error) => {
        dispatch({ type: LOGIN_FAIL });
      });
  };
};
