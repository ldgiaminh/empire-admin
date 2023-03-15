import { call, put, takeEvery } from "redux-saga/effects"

// User Redux States
import { GET_CARS_BRAND } from "./actionTypes"

import { getCarsBrandSuccess, getCarsBrandFail } from "./actions"

//Include Both Helper File with needed methods
import { getCarsBrand } from "../../helpers/fakebackend_helper"

function* fetchCarsBrand() {
  try {
    const response = yield call(getCarsBrand)
    yield put(getCarsBrandSuccess(response))
  } catch (error) {
    yield put(getCarsBrandFail(error))
  }
}

// function* fetchUserProfile() {
//   try {
//     const response = yield call(getUserProfile)
//     yield put(getUserProfileSuccess(response))
//   } catch (error) {
//     yield put(getUserProfileFail(error))
//   }
// }

// function* onUpdateUser({ payload: user }) {
//   try {
//     const response = yield call(updateUser, user)
//     yield put(updateUserSuccess(response))
//   } catch (error) {
//     yield put(updateUserFail(error))
//   }
// }

// function* onDeleteUser({ payload: user }) {
//   try {
//     const response = yield call(deleteUser, user)
//     yield put(deleteUserSuccess(response))
//   } catch (error) {
//     yield put(deleteUserFail(error))
//   }
// }

// function* onAddNewUser({ payload: user }) {
//   try {
//     const response = yield call(addNewUser, user)

//     yield put(addUserSuccess(response))
//   } catch (error) {
//     yield put(addUserFail(error))
//   }
// }

function* usersSaga() {
  yield takeEvery(GET_CARS_BRAND, fetchCarsBrand)
  // yield takeEvery(GET_USER_PROFILE, fetchUserProfile)
  // yield takeEvery(ADD_NEW_USER, onAddNewUser)
  // yield takeEvery(UPDATE_USER, onUpdateUser)
  // yield takeEvery(DELETE_USER, onDeleteUser)
}

export default usersSaga
