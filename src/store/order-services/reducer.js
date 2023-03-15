import {
  GET_ORDER_SERVICE_LIST_FAIL,
  GET_ORDER_SERVICE_LIST_SUCCESS,
  GET_ORDER_SERVICE_DETAIL_FAIL,
  GET_ORDER_SERVICE_DETAIL_SUCCESS,
  GET_ORDER_SERVICE_LIST_BY_STATUS_FAIL,
  GET_ORDER_SERVICE_LIST_BY_STATUS_SUCCESS,
  PUT_ORDER_SERVICE_FAIL,
  PUT_ORDER_SERVICE_SUCCESS,
  PUT_ASSIGN_EXPERT_FAIL,
  PUT_ASSIGN_EXPERT_SUCCESS,
  GET_STATUS_LOG_SUCCESS,
  GET_STATUS_LOG_FAIL,
  PUT_CONFIRM_SERVICES_SUCCESS,
  PUT_CONFIRM_SERVICES_FAIL,
  PUT_CONFIRM_PAID_SERVICES_SUCCESS,
  PUT_CONFIRM_PAID_SERVICES_FAIL,
  POST_CHECKOUT_SERVICES_SUCCESS,
  POST_CHECKOUT_SERVICES_FAIL,
} from "./actionTypes"

const INIT_STATE = {
  orderServicess: [],
  orderServicesDetails: {},
  orderServiceLogs: [],
  error: {},
}

const orderServices = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ORDER_SERVICE_LIST_SUCCESS:
      return {
        ...state,
        orderServicess: action.payload,
      }

    case GET_ORDER_SERVICE_LIST_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_ORDER_SERVICE_LIST_BY_STATUS_SUCCESS:
      return {
        ...state,
        orderServicess: action.payload,
      }

    case GET_ORDER_SERVICE_LIST_BY_STATUS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_ORDER_SERVICE_DETAIL_SUCCESS:
      return {
        ...state,
        orderServicesDetails: action.payload,
      }

    case GET_ORDER_SERVICE_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case GET_STATUS_LOG_SUCCESS:
      return {
        ...state,
        orderServiceLogs: action.payload,
      }

    case GET_STATUS_LOG_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    // case PUT_ORDER_SERVICE_SUCCESS:
    //   return {
    //     ...state,
    //     orderServicess: state.orderServicess.map(service =>
    //       service.id.toString() === action.payload.id.toString()
    //         ? { ...action.payload, service }
    //         : service
    //     ),
    //   }

    case PUT_ORDER_SERVICE_SUCCESS:
      return {
        ...state,
        orderServicesDetails: action.payload,
      }

    case PUT_ORDER_SERVICE_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case PUT_ASSIGN_EXPERT_SUCCESS:
      return {
        ...state,
        orderServicesDetails: state.orderServicesDetails.map(service =>
          service.id.toString() === action.payload.id.toString()
            ? { ...action.pay.load, service }
            : service
        ),
      }

    case PUT_ASSIGN_EXPERT_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case PUT_CONFIRM_SERVICES_SUCCESS:
      return {
        ...state,
        orderServicesDetails: state.orderServicesDetails.map(service =>
          service.id.toString() === action.payload.id.toString()
            ? { ...action.pay.load, service }
            : service
        ),
      }

    case PUT_CONFIRM_SERVICES_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case PUT_CONFIRM_PAID_SERVICES_SUCCESS:
      return {
        ...state,
        orderServicesDetails: state.orderServicesDetails.map(service =>
          service.id.toString() === action.payload.id.toString()
            ? { ...action.pay.load, service }
            : service
        ),
      }

    case PUT_CONFIRM_PAID_SERVICES_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case POST_CHECKOUT_SERVICES_SUCCESS:
      return {
        ...state,
        orderServiceLogs: [...state.orderServiceLogs, action.payload],
      }

    case POST_CHECKOUT_SERVICES_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default orderServices
