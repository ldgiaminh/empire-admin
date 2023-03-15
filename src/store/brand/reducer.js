import {
  ADD_CAR_BRAND_FAIL,
  ADD_CAR_BRAND_SUCCESS,
  DELETE_CAR_BRAND_FAIL,
  DELETE_CAR_BRAND_SUCCESS,
  UPDATE_CAR_BRAND_FAIL,
  UPDATE_CAR_BRAND_SUCCESS,
  GET_CARS_BRAND_FAIL,
  GET_CARS_BRAND_SUCCESS,
  GET_CAR_BRAND_DETAIL_FAIL,
  GET_CAR_BRAND_DETAIL_SUCCESS,
} from "./actionTypes"

const INIT_STATE = {
  carsBrand: [],
  carsBrandDetail: {},
  error: {},
}

const carsBrands = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_CARS_BRAND_SUCCESS:
      return {
        ...state,
        carsBrand: action.payload,
      }

    case GET_CARS_BRAND_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case ADD_CAR_BRAND_SUCCESS:
      return {
        ...state,
        carsBrand: [...state.carsBrand, action.payload],
      }

    case ADD_CAR_BRAND_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_CAR_BRAND_DETAIL_SUCCESS:
      return {
        ...state,
        carsBrandDetail: action.payload,
      }

    case UPDATE_CAR_BRAND_SUCCESS:
      return {
        ...state,
        carsBrand: state.carsBrand.map(user =>
          user.id.toString() === action.payload.id.toString()
            ? { user, ...action.payload }
            : user
        ),
      }

    case UPDATE_CAR_BRAND_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case DELETE_CAR_BRAND_SUCCESS:
      return {
        ...state,
        carsBrand: state.carsBrand.filter(
          user => user.id.toString() !== action.payload.id.toString()
        ),
      }

    case DELETE_CAR_BRAND_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_CAR_BRAND_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default carsBrands
