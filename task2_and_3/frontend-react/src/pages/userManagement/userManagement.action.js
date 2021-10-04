import { actions, editStatus } from "./userManagement.constant";
import axios from "../../axios-request";

const {
  FIND_USERS_BY_NAME,
  START_EDIT_USERS,
  END_EDIT_USERS,
  START_UPDATE_USERS,
  NOT_UPDATE_USERS,
  UPDATE_USERS_PARTIALLY_SUCCESS,
  UPDATE_USERS_FAIL,
  UPDATE_SUCCESS,
} = actions;

export const getUsersByName = (users) => {
  return {
    type: FIND_USERS_BY_NAME,
    users: users,
  };
};

export const changeEditStatus = (currentEditStatus) => {
  return (dispatch) => {
    if (currentEditStatus === editStatus.notEditting){
      dispatch({ type: START_EDIT_USERS });
      dispatch({ type: NOT_UPDATE_USERS });
    }
    else dispatch({ type: END_EDIT_USERS });
  };
};

export const updateUsers = (newUsers) => {
  const token = localStorage.getItem("token");
  return async (dispatch) => {
    dispatch({ type: START_UPDATE_USERS })
    axios
      .post("/users/update-multiple", newUsers, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        if (result.data.errorCode) {
          //Update partially success
          if (result.data.errorCode === 1)
            dispatch({
              type: UPDATE_USERS_PARTIALLY_SUCCESS,
              payload: {users: result.data.finalizedUsers},
            });
          else dispatch({ type: UPDATE_USERS_FAIL });
        } else {
          dispatch({
            type: UPDATE_SUCCESS,
            payload: { users: result.data.finalizedUsers },
          });
        }
      })
      .catch((error) => {
        dispatch({ type: UPDATE_USERS_FAIL });
      });
  };
};

export const fetchUsers = (name) => {
  const token = localStorage.getItem("token");
  return (dispatch) => {
    axios
      .get("/users/get-all-by-name", {
        params: {
          name: name,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        dispatch(getUsersByName(res.data));
      })
      .catch((err) => {
      });
  };
};
