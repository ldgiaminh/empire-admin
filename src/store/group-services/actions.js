import {
  GET_GROUP_SERVICE,
  GET_GROUP_SERVICE_FAIL,
  GET_GROUP_SERVICE_SUCCESS,
} from "./actionTypes"

/*
================================================ 
GET GROUP SERVICE  
================================================
*/
export const getGroupService = () => ({
  type: GET_GROUP_SERVICE,
})

export const getGroupServiceSuccess = groupService => ({
  type: GET_GROUP_SERVICE_SUCCESS,
  payload: groupService,
})

export const getGroupServiceFail = error => ({
  type: GET_GROUP_SERVICE_FAIL,
  payload: error,
})
