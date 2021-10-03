import { createSelector } from "reselect";
import { get } from "lodash";

const loginStatusSelector = createSelector(
  (state) => {
    return get(state, "auth.loginStatus");
  },
  (status) => {
    return status;
  }
);

export { loginStatusSelector };
