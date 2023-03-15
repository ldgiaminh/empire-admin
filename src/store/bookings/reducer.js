import {
  GET_BOOKING_LIST_FAIL,
  GET_BOOKING_LIST_SUCCESS,
  GET_BOOKING_DETAIL_FAIL,
  GET_BOOKING_DETAIL_SUCCESS,
  ADD_BOOKING_FAIL,
  ADD_BOOKING_SUCCESS,
  DELETE_BOOKING_FAIL,
  DELETE_BOOKING_SUCCESS,
  UPDATE_BOOKING_FAIL,
  UPDATE_BOOKING_SUCCESS,
  CHECKIN_BOOKING_FAIL,
  CHECKIN_BOOKING_SUCCESS,
  GET_BOOKING_LIST_BY_DATE_SUCCESS,
  GET_BOOKING_LIST_BY_DATE_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  bookings: [],
  bookingDetail: {},
  error: {},
}

const bookings = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_BOOKING_LIST_SUCCESS:
      return {
        ...state,
        bookings: action.payload,
      }

    case GET_BOOKING_LIST_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_BOOKING_LIST_BY_DATE_SUCCESS:
      return {
        ...state,
        bookings: action.payload,
      }

    case GET_BOOKING_LIST_BY_DATE_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_BOOKING_DETAIL_SUCCESS:
      return {
        ...state,
        bookingDetail: action.payload,
      }

    case CHECKIN_BOOKING_SUCCESS:
      return {
        ...state,
        bookingDetail: state.bookingDetail.map(booking =>
          booking.id.toString() === action.payload.id.toString()
            ? { booking, ...action.payload }
            : booking
        ),
        bookings: state.bookings.filter(
          booking => booking.id.toString() !== action.payload.id.toString()
        ),
      }

    case CHECKIN_BOOKING_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_BOOKING_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_BOOKING_DETAIL_SUCCESS:
      return {
        ...state,
        bookingDetail: action.payload,
      }

    case ADD_BOOKING_SUCCESS:
      return {
        ...state,
        bookings: [...state.bookings, action.payload],
      }

    case ADD_BOOKING_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case UPDATE_BOOKING_SUCCESS:
      return {
        ...state,
        bookings: state.bookings.map(user =>
          booking.id.toString() === action.payload.id.toString()
            ? { booking, ...action.payload }
            : booking
        ),
      }

    case UPDATE_BOOKING_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case DELETE_BOOKING_SUCCESS:
      return {
        ...state,
        booking: state.bookings.filter(
          booking => booking.id.toString() !== action.payload.id.toString()
        ),
      }

    case DELETE_BOOKING_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default bookings
