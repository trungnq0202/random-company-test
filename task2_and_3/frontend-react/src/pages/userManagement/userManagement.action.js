import { actions } from "./userManagement.constant";
import axios from "../../axios-request";

const { FIND_USERS_BY_NAME } = actions;

export const getUsersByName = (users) => {
  return {
    type: FIND_USERS_BY_NAME,
    users: users,
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
        console.log(err);
      });
  };
};
