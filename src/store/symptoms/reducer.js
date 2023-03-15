import {
  ADD_SYMPTOMS_FAIL,
  ADD_SYMPTOMS_SUCCESS,
  DELETE_SYMPTOMS_FAIL,
  DELETE_SYMPTOMS_SUCCESS,
  GET_SYMPTOMS_DETAIL_FAIL,
  GET_SYMPTOMS_DETAIL_SUCCESS,
  GET_SYMPTOMS_LIST_FAIL,
  GET_SYMPTOMS_LIST_SUCCESS,
  UPDATE_SYMPTOMS_FAIL,
  UPDATE_SYMPTOMS_SUCCESS,
} from "./actionTypes"

const INIT_STATE = {
  symptoms: [],
  symptomsDetail: {},
  error: {},
}

const symptomsLists = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_SYMPTOMS_LIST_SUCCESS:
      return {
        ...state,
        symptoms: action.payload,
      }

    case GET_SYMPTOMS_LIST_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_SYMPTOMS_DETAIL_SUCCESS:
      return {
        ...state,
        bookingDetail: action.payload,
      }

    case GET_SYMPTOMS_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case ADD_SYMPTOMS_SUCCESS:
      return {
        ...state,
        symptoms: [...state.symptoms, action.payload],
      }

    case ADD_SYMPTOMS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case UPDATE_SYMPTOMS_SUCCESS:
      return {
        ...state,
        symptoms: state.symptoms.map(user =>
          booking.id.toString() === action.payload.id.toString()
            ? { booking, ...action.payload }
            : booking
        ),
      }

    case UPDATE_SYMPTOMS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case DELETE_SYMPTOMS_SUCCESS:
      return {
        ...state,
        booking: state.symptoms.filter(
          booking => booking.id.toString() !== action.payload.id.toString()
        ),
      }

    case DELETE_SYMPTOMS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default symptomsLists
