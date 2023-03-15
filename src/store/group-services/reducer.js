import {
  GET_GROUP_SERVICE_FAIL,
  GET_GROUP_SERVICE_SUCCESS,
} from "./actionTypes"

const INIT_STATE = {
  groupService: [],
  error: {},
}

const groupServices = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_GROUP_SERVICE_SUCCESS:
      return {
        ...state,
        groupService: action.payload,
      }

    case GET_GROUP_SERVICE_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default groupServices
