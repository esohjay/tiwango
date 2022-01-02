import { useCallback } from "react";
import Axios from "axios";
import { useUserContext } from "../context/userContext";
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
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  USER_IS_ADMIN_REQUEST,
  USER_IS_ADMIN_SUCCESS,
  USER_IS_ADMIN_FAIL,
  USER_IS_ADMIN_RESET,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_RESET,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_RESET,
  CONTACT_US_REQUEST,
  CONTACT_US_SUCCESS,
  CONTACT_US_FAIL,
  CONTACT_US_RESET,
} from "../constants/user";

export const useUserActions = () => {
  const { dispatch } = useUserContext();

  const createUser = async (info) => {
    dispatch({ type: USER_REGISTER_REQUEST });
    try {
      const { data } = await Axios.post(
        `${process.env.REACT_APP_URL}/api/users/`,
        info
      );
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({ type: USER_REGISTER_FAIL, payload: message });
    }
  };
  const contactUs = async (info) => {
    dispatch({ type: CONTACT_US_REQUEST });
    dispatch({ type: CONTACT_US_RESET });
    try {
      const { data } = await Axios.post(
        `${process.env.REACT_APP_URL}/api/users/contact`,
        info
      );
      dispatch({ type: CONTACT_US_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({ type: CONTACT_US_FAIL, payload: message });
    }
  };
  const signinUser = async (info) => {
    dispatch({ type: USER_SIGNIN_REQUEST });
    try {
      const { data } = await Axios.post(
        `${process.env.REACT_APP_URL}/api/users/signin`,
        info
      );
      dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({ type: USER_SIGNIN_FAIL, payload: message });
    }
  };

  const getUserDetails = useCallback(
    async (id) => {
      dispatch({ type: USER_DETAILS_REQUEST });

      try {
        const { data } = await Axios.get(
          `${process.env.REACT_APP_URL}/api/users/${id}`
        );
        dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({ type: USER_DETAILS_FAIL, payload: message });
      }
    },
    [dispatch]
  );

  const getAllUsers = useCallback(
    async ({ page = 1, limit = 30, search = "" }) => {
      dispatch({ type: ALL_USERS_REQUEST });
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const header = {
        headers: { Authorization: `Bearer ${userInfo?.token}` },
      };
      try {
        const { data } = await Axios.get(
          `${process.env.REACT_APP_URL}/api/users?page=${page}&limit=${limit}&search=${search}`,
          header
        );
        dispatch({ type: ALL_USERS_SUCCESS, payload: data });
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({ type: ALL_USERS_FAIL, payload: message });
      }
    },
    [dispatch]
  );

  const deleteUser = async (id) => {
    dispatch({ type: DELETE_USER_REQUEST });
    dispatch({ type: DELETE_USER_RESET });
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const header = {
      headers: { Authorization: `Bearer ${userInfo?.token}` },
    };
    try {
      const { data } = await Axios.delete(
        `${process.env.REACT_APP_URL}/api/users/${id}`,

        header
      );
      dispatch({ type: DELETE_USER_SUCCESS, payload: data });
      if (!userInfo.isAdmin) {
        localStorage.removeItem("userInfo");
        document.location.href = "/signin";
      }
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({ type: DELETE_USER_FAIL, payload: message });
    }
  };

  const updateUser = async (info, history) => {
    dispatch({ type: USER_UPDATE_REQUEST });
    dispatch({ type: USER_UPDATE_RESET });
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const header = {
      headers: { Authorization: `Bearer ${userInfo?.token}` },
    };
    try {
      const { data } = await Axios.put(
        `${process.env.REACT_APP_URL}/api/users/${info.id}`,
        info,
        header
      );
      dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      history.push(`/user/${data._id}`);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({ type: USER_UPDATE_FAIL, payload: message });
    }
  };

  const changeAdminStatus = async (id) => {
    dispatch({ type: USER_IS_ADMIN_REQUEST });
    dispatch({ type: USER_IS_ADMIN_RESET });
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const header = {
      headers: { Authorization: `Bearer ${userInfo?.token}` },
    };
    try {
      const { data } = await Axios.put(
        `${process.env.REACT_APP_URL}/api/users/is-admin/${id}`,
        {},
        header
      );
      dispatch({ type: USER_IS_ADMIN_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({ type: USER_IS_ADMIN_FAIL, payload: message });
    }
  };

  const updatePassword = async (info) => {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });
    dispatch({ type: UPDATE_PASSWORD_RESET });
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    const header = {
      headers: { Authorization: `Bearer ${userInfo?.token}` },
    };
    try {
      const { data } = await Axios.put(
        `${process.env.REACT_APP_URL}/api/users/password/${info.id}`,
        info,
        header
      );
      dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({ type: UPDATE_PASSWORD_FAIL, payload: message });
    }
  };

  const signout = () => {
    localStorage.removeItem("userInfo");
    dispatch({ type: USER_SIGNOUT });
    document.location.href = "/signin";
  };

  return {
    createUser,
    signinUser,
    signout,
    updateUser,
    getUserDetails,
    updatePassword,
    contactUs,
    getAllUsers,
    changeAdminStatus,
    deleteUser,
  };
};
