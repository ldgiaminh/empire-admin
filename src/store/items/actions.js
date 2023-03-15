import {
  GET_ITEM_LIST,
  GET_ITEM_LIST_FAIL,
  GET_ITEM_LIST_SUCCESS,
} from "./actionTypes"

/*
================================================ 
GET ITEM LIST 
================================================
*/
export const getItemLists = () => ({
  type: GET_ITEM_LIST,
})

export const getItemListsSuccess = items => ({
  type: GET_ITEM_LIST_SUCCESS,
  payload: items,
})

export const getItemListsFail = error => ({
  type: GET_ITEM_LIST_FAIL,
  payload: error,
})
