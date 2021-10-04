const FIND_USERS_BY_NAME = 'FIND_USERS_BY_NAME'
const START_EDIT_USERS = 'START_EDIT_USERS'
const END_EDIT_USERS = 'END_EDIT_USERS'
const START_UPDATE_USERS = 'START_UPDATE_USERS'
const NOT_UPDATE_USERS = 'NOT_UPDATE_USERS'
const UPDATE_USERS_PARTIALLY_SUCCESS = 'UPDATE_USERS_PARTIALLY_SUCCESS'
const UPDATE_USERS_FAIL = 'UPDATE_USERS_FAIL'
const UPDATE_SUCCESS = 'UPDATE_SUCCESS'

const editStatus = {
    editting: 1,
    notEditting: 2
}

const updateStatus = {
    notUpdate: 1,
    updating: 2,
    updateSuccess: 3,
    updatePartiallySuccess: 4,
    updateFail: 5 
}

const actions = {
    FIND_USERS_BY_NAME,
    START_EDIT_USERS,
    END_EDIT_USERS,
    START_UPDATE_USERS,
    NOT_UPDATE_USERS,
    UPDATE_USERS_PARTIALLY_SUCCESS,
    UPDATE_USERS_FAIL,
    UPDATE_SUCCESS
}

export {
    actions,
    editStatus,
    updateStatus
}
