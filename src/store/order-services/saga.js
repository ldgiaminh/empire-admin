import { call, put, takeEvery } from "redux-saga/effects"

//OrderService Redux States
import {
  GET_ORDER_SERVICE_LIST,
  GET_ORDER_SERVICE_LIST_BY_STATUS,
  GET_ORDER_SERVICE_DETAIL,
  PUT_ORDER_SERVICE,
  PUT_ASSIGN_EXPERT,
  PUT_CONFIRM_SERVICES,
  GET_STATUS_LOG,
  PUT_CONFIRM_PAID_SERVICES,
  POST_CHECKOUT_SERVICES,
} from "./actionTypes"

import {
  getOrderServicesListsSuccess,
  getOrderServicesListsFail,
  getOrderServicesDetailsFail,
  getOrderServicesDetailsSuccess,
  getOrderServicesListByStatusSuccess,
  getOrderServicesListByStatusFail,
  putOrderServicesFail,
  putOrderServicesSuccess,
  putAssginExpertsFail,
  putAssginExpertsSuccess,
  putConfirmServicesFail,
  putConfirmServicesSuccess,
  putConfirmPaidFail,
  putConfirmPaidSuccess,
  postCheckOutFail,
  postCheckOutSuccess,
  getStatusLogFail,
  getStatusLogSuccess,
} from "./actions"

import {
  getOrderServicesLists,
  getOrderServicesListByStatus,
  getOrderServicesDetails,
  putOrderServices,
  putAssignExperts,
  putConfirmServices,
  putConfirmPaid,
  postCheckOut,
  getStatusLog,
} from "../../helpers/fakebackend_helper"

function* fetchOrderServicessLists() {
  try {
    const response = yield call(getOrderServicesLists)
    yield put(getOrderServicesListsSuccess(response))
  } catch (error) {
    yield put(getOrderServicesListsFail(error))
  }
}

function* fetchOrderServiceListByStatus({ status }) {
  try {
    const response = yield call(getOrderServicesListByStatus, status)
    yield put(getOrderServicesListByStatusSuccess(response))
  } catch (error) {
    yield put(getOrderServicesListByStatusFail(error))
  }
}

function* fetchOrderServicesDetails({ orderServiceId }) {
  try {
    const response = yield call(getOrderServicesDetails, orderServiceId)
    yield put(getOrderServicesDetailsSuccess(response))
  } catch (error) {
    yield put(getOrderServicesDetailsFail(error))
  }
}

function* onRecommendService({ payload: { orderServiceId, services } }) {
  try {
    const response = yield call(putOrderServices, orderServiceId, services)
    yield put(putOrderServicesSuccess(response))
  } catch (error) {
    yield put(putOrderServicesFail(error))
  }
}

function* onAssignExpert({ payload: { orderServiceId, exId } }) {
  try {
    const response = yield call(putAssignExperts, orderServiceId, exId)
    yield put(putAssginExpertsSuccess(response))
  } catch (error) {
    yield put(putAssginExpertsFail(error))
  }
}

function* onConfirmServices({ payload: { orderServiceId, services } }) {
  try {
    const response = yield call(putConfirmServices, orderServiceId, services)
    yield put(putConfirmServicesSuccess(response))
  } catch (error) {
    yield put(putConfirmServicesFail(error))
  }
}

function* onConfirmPaidServices({ payload: { orderServiceId, services } }) {
  try {
    const response = yield call(putConfirmPaid, orderServiceId, services)
    yield put(putConfirmPaidSuccess(response))
  } catch (error) {
    yield put(putConfirmPaidFail(error))
  }
}

function* checkOutServices({ payload: { statusLogId } }) {
  try {
    const response = yield call(postCheckOut, statusLogId)
    yield put(postCheckOutSuccess(response))
  } catch (error) {
    yield put(postCheckOutFail(error))
  }
}

function* fetchStatusLog({ orderServiceId }) {
  try {
    const response = yield call(getStatusLog, orderServiceId)
    yield put(getStatusLogSuccess(response))
  } catch (error) {
    yield put(getStatusLogFail(error))
  }
}

function* orderServicesSaga() {
  //yield takeEvery(GET_ORDER_SERVICE_LIST, fetchOrderServicessLists)
  yield takeEvery(
    GET_ORDER_SERVICE_LIST_BY_STATUS,
    fetchOrderServiceListByStatus
  )
  yield takeEvery(GET_ORDER_SERVICE_DETAIL, fetchOrderServicesDetails)
  yield takeEvery(PUT_ORDER_SERVICE, onRecommendService)
  yield takeEvery(PUT_ASSIGN_EXPERT, onAssignExpert)
  //yield takeEvery(PUT_CONFIRM_SERVICES, onConfirmServices)
  yield takeEvery(PUT_CONFIRM_PAID_SERVICES, onConfirmPaidServices)
  yield takeEvery(POST_CHECKOUT_SERVICES, checkOutServices)
  yield takeEvery(GET_STATUS_LOG, fetchStatusLog)
}

export default orderServicesSaga
