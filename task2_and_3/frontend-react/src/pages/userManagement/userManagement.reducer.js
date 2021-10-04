import { actions, editStatus, updateStatus } from "./userManagement.constant";
import { combineOldAndUpdatedUsers } from "./userManagement.helper";

const {
  FIND_USERS_BY_NAME,
  START_EDIT_USERS,
  END_EDIT_USERS,
  START_UPDATE_USERS,
  NOT_UPDATE_USERS,
  UPDATE_USERS_PARTIALLY_SUCCESS,
  UPDATE_USERS_FAIL,
  UPDATE_SUCCESS
} = actions;

const INITIAL_STATE = {
  users: [],
  editStatus: editStatus.notEditting,
  updateStatus: updateStatus.notUpdate
};

export default function userManagementReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FIND_USERS_BY_NAME:
      return {
        ...state,
        users: action.users,
      };
    case START_EDIT_USERS:
      return {
        ...state,
        editStatus: editStatus.editting,
      };
    case END_EDIT_USERS:
      return {
        ...state,
        editStatus: editStatus.notEditting,
      };
    case NOT_UPDATE_USERS:
      return {
        ...state,
        updateStatus: updateStatus.notUpdate
      }
    case START_UPDATE_USERS:
      return {
        ...state,
        updateStatus: updateStatus.updating
      }
    case UPDATE_USERS_PARTIALLY_SUCCESS:
      return {
        ...state,
        updateStatus: updateStatus.updatePartiallySuccess,
        users: combineOldAndUpdatedUsers(state.users, action.payload.users)
      }
    case UPDATE_USERS_FAIL:
      return {
        ...state,
        updateStatus: updateStatus.updateFail
      }
    case UPDATE_SUCCESS:
      return{
        ...state,
        updateStatus: updateStatus.notUpdate,
        users: combineOldAndUpdatedUsers(state.users, action.payload.users)
      }
    default:
      return state;
  }
};