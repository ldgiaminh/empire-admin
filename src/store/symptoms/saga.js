import { call, put, takeEvery } from "redux-saga/effects"

//Booking Redux States
import { GET_SYMPTOMS_LIST } from "./actionTypes"

import {
  getSymptomsListsFail,
  getSymptomsListsSuccess,
  addNewBookingFail,
  addNewBookingSuccess,
  deleteBookingError,
  deleteBookingSuccess,
  updateBookingFail,
  updateBookingSuccess,
} from "./actions"

import { getSymptoms } from "../../helpers/fakebackend_helper"

function* fetchSymptomsLists() {
  try {
    const response = yield call(getSymptoms)
    yield put(getSymptomsListsSuccess(response))
  } catch (error) {
    yield put(getSymptomsListsFail(error))
  }
}

// function* fetchBookingsDetails({ bookingId }) {
//   try {
//     const response = yield call(getBookingsDetails, bookingId)
//     yield put(getBookingDetailsSuccess(response))
//   } catch (error) {
//     yield put(getBookingDetailsFail(error))
//   }
// }

function* symptomsSaga() {
  yield takeEvery(GET_SYMPTOMS_LIST, fetchSymptomsLists)
  //yield takeEvery(GET_BOOKING_DETAIL, fetchBookingsDetails)
}

export default symptomsSaga
