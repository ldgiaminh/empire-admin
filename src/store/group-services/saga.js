import { call, put, takeEvery } from "redux-saga/effects"

//Booking Redux States
import { GET_GROUP_SERVICE } from "./actionTypes"

import { getGroupServiceSuccess, getGroupServiceFail } from "./actions"

import { getGroupService } from "../../helpers/fakebackend_helper"

function* fetchGroupService() {
  try {
    const response = yield call(getGroupService)
    yield put(getGroupServiceSuccess(response))
  } catch (error) {
    yield put(getGroupServiceFail(error))
  }
}

function* groupServicesSaga() {
  yield takeEvery(GET_GROUP_SERVICE, fetchGroupService)
}

export default groupServicesSaga
