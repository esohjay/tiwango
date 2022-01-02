import {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNOUT,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_RESET,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  CONTACT_US_REQUEST,
  CONTACT_US_SUCCESS,
  CONTACT_US_FAIL,
  CONTACT_US_RESET,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  USER_IS_ADMIN_REQUEST,
  USER_IS_ADMIN_SUCCESS,
  USER_IS_ADMIN_FAIL,
  USER_IS_ADMIN_RESET,
  UPDATE_PASSWORD_RESET,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_RESET,
} from "../constants/user";
export const userReducer = (state, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { ...state, loading: true };
    case USER_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
        success: true,
      };
    case USER_REGISTER_FAIL:
      return { ...state, loading: false, error: action.payload };
    case CONTACT_US_REQUEST:
      return { ...state, loading: true };
    case CONTACT_US_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
        messageSent: true,
      };
    case CONTACT_US_RESET:
      return {
        ...state,

        messageSent: false,
      };
    case CONTACT_US_FAIL:
      return { ...state, loading: false, error: action.payload };

    case USER_SIGNIN_REQUEST:
      return { ...state, loading: true };
    case USER_SIGNIN_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload,

        success: true,
      };
    case USER_SIGNIN_FAIL:
      return { ...state, loading: false, error: action.payload };
    case USER_UPDATE_REQUEST:
      return { ...state, loading: true };
    case USER_UPDATE_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
        updatedUser: true,
      };
    case USER_UPDATE_RESET:
      return {
        ...state,
        updatedUser: false,
      };
    case USER_UPDATE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case USER_DETAILS_SUCCESS:
      return { ...state, loading: false, user: action.payload, success: true };
    case USER_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload };

    case ALL_USERS_REQUEST:
      return { ...state, loading: true };
    case ALL_USERS_SUCCESS:
      return { ...state, loading: false, users: action.payload, success: true };
    case ALL_USERS_FAIL:
      return { ...state, loading: false, error: action.payload };

    case USER_IS_ADMIN_REQUEST:
      return { ...state, loading: true };
    case USER_IS_ADMIN_SUCCESS:
      return { ...state, loading: false, madeAdmin: true };
    case USER_IS_ADMIN_FAIL:
      return { ...state, loading: false, error: action.payload };
    case USER_IS_ADMIN_RESET:
      return { ...state, loading: false, madeAdmin: false };

    case DELETE_USER_REQUEST:
      return { ...state, loading: true };
    case DELETE_USER_SUCCESS:
      return { ...state, loading: false, userDeleted: true };
    case DELETE_USER_FAIL:
      return { ...state, loading: false, error: action.payload };
    case DELETE_USER_RESET:
      return { ...state, loading: false, userDeleted: false };

    case UPDATE_PASSWORD_REQUEST:
      return { ...state, loading: true };
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
        updatedPassword: true,
      };
    case UPDATE_PASSWORD_RESET:
      return {
        ...state,

        updatedPassword: false,
      };
    case UPDATE_PASSWORD_FAIL:
      return { ...state, loading: false, error: action.payload };
    case USER_SIGNOUT:
      return {};
    default:
      return state;
  }
};
