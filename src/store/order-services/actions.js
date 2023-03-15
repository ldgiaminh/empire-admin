import {
  GET_ORDER_SERVICE_LIST,
  GET_ORDER_SERVICE_LIST_FAIL,
  GET_ORDER_SERVICE_LIST_SUCCESS,
  GET_ORDER_SERVICE_DETAIL,
  GET_ORDER_SERVICE_DETAIL_FAIL,
  GET_ORDER_SERVICE_DETAIL_SUCCESS,
  PUT_ORDER_SERVICE,
  PUT_ORDER_SERVICE_FAIL,
  PUT_ORDER_SERVICE_SUCCESS,
  PUT_ASSIGN_EXPERT,
  PUT_ASSIGN_EXPERT_FAIL,
  PUT_ASSIGN_EXPERT_SUCCESS,
  GET_STATUS_LOG,
  GET_STATUS_LOG_SUCCESS,
  GET_STATUS_LOG_FAIL,
  PUT_CONFIRM_SERVICES,
  PUT_CONFIRM_SERVICES_SUCCESS,
  PUT_CONFIRM_SERVICES_FAIL,
  PUT_CONFIRM_PAID_SERVICES,
  PUT_CONFIRM_PAID_SERVICES_SUCCESS,
  PUT_CONFIRM_PAID_SERVICES_FAIL,
  POST_CHECKOUT_SERVICES,
  POST_CHECKOUT_SERVICES_SUCCESS,
  POST_CHECKOUT_SERVICES_FAIL,
} from "./actionTypes"

/*
================================================ 
GET OrderServices LIST 
================================================
*/
export const getOrderServicesLists = () => ({
  type: GET_ORDER_SERVICE_LIST,
})

export const getOrderServicesListsSuccess = orderServicess => ({
  type: GET_ORDER_SERVICE_LIST_SUCCESS,
  payload: orderServicess,
})

export const getOrderServicesListsFail = error => ({
  type: GET_ORDER_SERVICE_LIST_FAIL,
  payload: error,
})

/*
================================================ 
GET OrderServices List By Status
================================================
*/
export const getOrderServicesListByStatus = status => ({
  type: GET_ORDER_SERVICE_LIST,
  status,
})

export const getOrderServicesListByStatusSuccess = orderServicess => ({
  type: GET_ORDER_SERVICE_LIST_SUCCESS,
  payload: orderServicess,
})

export const getOrderServicesListByStatusFail = error => ({
  type: GET_ORDER_SERVICE_LIST_FAIL,
  payload: error,
})

/*
================================================ 
GET OrderServices Detail 
================================================
*/
export const getOrderServicesDetails = orderServiceId => ({
  type: GET_ORDER_SERVICE_DETAIL,
  orderServiceId,
})

export const getOrderServicesDetailsSuccess = orderServicesDetails => ({
  type: GET_ORDER_SERVICE_DETAIL_SUCCESS,
  payload: orderServicesDetails,
})

export const getOrderServicesDetailsFail = error => ({
  type: GET_ORDER_SERVICE_DETAIL_FAIL,
  payload: error,
})

/*
================================================ 
PUT OrderServices  
================================================
*/
export const putOrderServices = (orderServiceId, services) => ({
  type: PUT_ORDER_SERVICE,
  payload: { orderServiceId, services },
})

export const putOrderServicesSuccess = orderServicesDetails => ({
  type: PUT_ORDER_SERVICE_SUCCESS,
  payload: orderServicesDetails,
})

export const putOrderServicesFail = error => ({
  type: PUT_ORDER_SERVICE_FAIL,
  payload: error,
})

/*
================================================ 
PUT OrderServices Assign 
================================================
*/
export const putAssignExperts = (orderServiceId, exId) => ({
  type: PUT_ASSIGN_EXPERT,
  payload: { orderServiceId, exId },
})

export const putAssginExpertsSuccess = orderServicesDetails => ({
  type: PUT_ASSIGN_EXPERT_SUCCESS,
  payload: orderServicesDetails,
})

export const putAssginExpertsFail = error => ({
  type: PUT_ASSIGN_EXPERT_FAIL,
  payload: error,
})

/*
================================================ 
GET Status Log
================================================
*/
export const getStatusLog = orderServiceId => ({
  type: GET_STATUS_LOG,
  orderServiceId,
})

export const getStatusLogSuccess = orderServiceLog => ({
  type: GET_STATUS_LOG_SUCCESS,
  payload: orderServiceLog,
})

export const getStatusLogFail = error => ({
  type: GET_STATUS_LOG_FAIL,
  payload: error,
})

/*
================================================ 
PUT Confirm Service
================================================
*/
export const putConfirmServices = (orderServiceId, services) => ({
  type: PUT_CONFIRM_SERVICES,
  payload: { orderServiceId, services },
})

export const putConfirmServicesSuccess = orderServicesDetails => ({
  type: PUT_CONFIRM_SERVICES_SUCCESS,
  payload: orderServicesDetails,
})

export const putConfirmServicesFail = error => ({
  type: PUT_CONFIRM_SERVICES_FAIL,
  payload: error,
})

/*
================================================ 
PUT Confirm & Paid
================================================
*/
export const putConfirmPaid = (orderServiceId, services) => ({
  type: PUT_CONFIRM_PAID_SERVICES,
  payload: { orderServiceId, services },
})

export const putConfirmPaidSuccess = orderServicesDetails => ({
  type: PUT_CONFIRM_PAID_SERVICES_SUCCESS,
  payload: orderServicesDetails,
})

export const putConfirmPaidFail = error => ({
  type: PUT_CONFIRM_PAID_SERVICES_FAIL,
  payload: error,
})

/*
================================================ 
POST Check out
================================================
*/
export const postCheckOut = statusLogId => ({
  type: POST_CHECKOUT_SERVICES,
  payload: { statusLogId },
})

export const postCheckOutSuccess = orderServiceLog => ({
  type: POST_CHECKOUT_SERVICES_SUCCESS,
  payload: orderServiceLog,
})

export const postCheckOutFail = error => ({
  type: POST_CHECKOUT_SERVICES_FAIL,
  payload: error,
})
