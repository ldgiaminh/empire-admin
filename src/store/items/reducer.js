import { GET_ITEM_LIST_FAIL, GET_ITEM_LIST_SUCCESS } from "./actionTypes"

const INIT_STATE = {
  items: [],
  itemDetails: {},
  error: {},
}

const items = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ITEM_LIST_SUCCESS:
      return {
        ...state,
        items: action.payload,
      }

    case GET_ITEM_LIST_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default items
