import { call, put, takeEvery } from "redux-saga/effects"

//Booking Redux States
import { GET_ITEM_LIST } from "./actionTypes"

import { getItemListsFail, getItemListsSuccess } from "./actions"

import { getItemLists } from "../../helpers/fakebackend_helper"

function* fetchItemLists() {
  try {
    const response = yield call(getItemLists)
    yield put(getItemListsSuccess(response))
  } catch (error) {
    yield put(getItemListsFail(error))
  }
}

function* fetchBookingsDetails({ bookingId }) {
  try {
    const response = yield call(getBookingsDetails, bookingId)
    yield put(getBookingDetailsSuccess(response))
  } catch (error) {
    yield put(checkinBookingFail(error))
  }
}

function* itemsSaga() {
  yield takeEvery(GET_ITEM_LIST, fetchItemLists)
  //yield takeEvery(GET_BOOKING_DETAIL, fetchBookingsDetails)
}

export default itemsSaga
