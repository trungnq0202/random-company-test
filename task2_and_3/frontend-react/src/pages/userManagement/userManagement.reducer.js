import { actions } from './userManagement.constant'

const { FIND_USERS_BY_NAME } = actions

const INITIAL_STATE = {
  users: []
}

const userManagementReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FIND_USERS_BY_NAME:
      return {
        ...state,
        users: action.users
      }
    default:
      return state
  }
}

export default userManagementReducer
