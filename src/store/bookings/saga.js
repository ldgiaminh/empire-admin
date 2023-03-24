import { call, put, takeEvery } from "redux-saga/effects"

//Booking Redux States
import {
  GET_BOOKING_LIST,
  GET_BOOKING_DETAIL,
  CHECKIN_BOOKING,
  GET_BOOKING_LIST_BY_DATE,
  ADD_NEW_BOOKING,
  UPDATE_BOOKING,
  DELETE_BOOKING,
  CHECKIN_QRCODE,
} from "./actionTypes"

import {
  getBookingListsFail,
  getBookingListsSuccess,
  getBookingListsByDateFail,
  getBookingListsByDateSuccess,
  getBookingDetailsFail,
  getBookingDetailsSuccess,
  checkinBookingFail,
  checkinBookingSuccess,
  checkinQRCodeFail,
  checkinQRCodeSuccess,
  addNewBookingFail,
  addNewBookingSuccess,
  deleteBookingError,
  deleteBookingSuccess,
  updateBookingFail,
  updateBookingSuccess,
} from "./actions"

import {
  getBookingsLists,
  getBookingListsByDate,
  getBookingsDetails,
  checkinBooking,
  checkinQRCode,
} from "../../helpers/fakebackend_helper"

function* fetchBookingsLists() {
  try {
    const response = yield call(getBookingsLists)
    yield put(getBookingListsSuccess(response))
  } catch (error) {
    yield put(getBookingListsFail(error))
  }
}

function* fetchBookingsListByDate({ date }) {
  try {
    const response = yield call(getBookingListsByDate, date)
    yield put(getBookingListsByDateSuccess(response))
  } catch (error) {
    yield put(getBookingListsByDateFail(error))
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

function* checkInBookings({ bookingId }) {
  try {
    const response = yield call(checkinBooking, bookingId)
    yield put(checkinBookingSuccess(response))
  } catch (error) {
    yield put(getBookingDetailsFail(error))
  }
}

function* checkInQRCodes({ data }) {
  try {
    const response = yield call(checkinQRCode, data)
    yield put(checkinQRCodeSuccess(response))
  } catch (error) {
    yield put(checkinQRCodeFail(error))
  }
}

function* bookingsSaga() {
  yield takeEvery(GET_BOOKING_LIST, fetchBookingsLists)
  yield takeEvery(GET_BOOKING_LIST_BY_DATE, fetchBookingsListByDate)
  yield takeEvery(GET_BOOKING_DETAIL, fetchBookingsDetails)
  yield takeEvery(CHECKIN_BOOKING, checkInBookings)
  yield takeEvery(CHECKIN_QRCODE, checkInQRCodes)
}

export default bookingsSaga
