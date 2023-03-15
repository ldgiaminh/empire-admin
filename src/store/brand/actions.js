import {
  ADD_NEW_CAR_BRAND,
  ADD_CAR_BRAND_FAIL,
  ADD_CAR_BRAND_SUCCESS,
  DELETE_CAR_BRAND,
  DELETE_CAR_BRAND_FAIL,
  DELETE_CAR_BRAND_SUCCESS,
  UPDATE_CAR_BRAND,
  UPDATE_CAR_BRAND_FAIL,
  UPDATE_CAR_BRAND_SUCCESS,
  GET_CARS_BRAND,
  GET_CARS_BRAND_FAIL,
  GET_CARS_BRAND_SUCCESS,
  GET_CAR_BRAND_DETAIL,
  GET_CAR_BRAND_DETAIL_FAIL,
  GET_CAR_BRAND_DETAIL_SUCCESS,
} from "./actionTypes"

export const getCarsBrand = () => ({
  type: GET_CARS_BRAND,
})

export const getCarsBrandSuccess = carsBrand => ({
  type: GET_CARS_BRAND_SUCCESS,
  payload: carsBrand,
})

export const addNewCarsBrand = carsBrand => ({
  type: ADD_NEW_CAR_BRAND,
  payload: carsBrand,
})

export const addNewCarsBrandSuccess = carsBrand => ({
  type: ADD_CAR_BRAND_SUCCESS,
  payload: carsBrand,
})

export const addNewCarsBrandFail = error => ({
  type: ADD_CAR_BRAND_FAIL,
  payload: error,
})

export const getCarsBrandFail = error => ({
  type: GET_CARS_BRAND_FAIL,
  payload: error,
})

export const getCarsBrandDetail = () => ({
  type: GET_CAR_BRAND_DETAIL,
})

export const getCarsBrandDetailSuccess = carsBrandDetail => ({
  type: GET_CAR_BRAND_DETAIL_SUCCESS,
  payload: carsBrandDetail,
})

export const getCarsBrandDetailFail = error => ({
  type: GET_CAR_BRAND_DETAIL_FAIL,
  payload: error,
})

export const updateCarsBrand = carsBrand => ({
  type: UPDATE_CAR_BRAND,
  payload: carsBrand,
})

export const updateCarsBrandSuccess = carsBrand => ({
  type: UPDATE_CAR_BRAND_SUCCESS,
  payload: carsBrand,
})

export const updateCarsBrandFail = error => ({
  type: UPDATE_CAR_BRAND_FAIL,
  payload: error,
})

export const deleteCarsBrand = carsBrand => ({
  type: DELETE_CAR_BRAND,
  payload: carsBrand,
})

export const deleteCarsBrandSuccess = carsBrand => ({
  type: DELETE_CAR_BRAND_SUCCESS,
  payload: carsBrand,
})

export const deleteCarsBrandFail = error => ({
  type: DELETE_CAR_BRAND_FAIL,
  payload: error,
})
