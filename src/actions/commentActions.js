import Axios from "axios";
import { useCommentContext } from "../context/commentContext";

import {
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAIL,
  CREATE_COMMENT_RESET,
  UPDATE_COMMENT_REQUEST,
  UPDATE_COMMENT_SUCCESS,
  UPDATE_COMMENT_FAIL,
  UPDATE_COMMENT_RESET,
  LIKE_COMMENT_REQUEST,
  LIKE_COMMENT_SUCCESS,
  LIKE_COMMENT_FAIL,
  LIKE_COMMENT_RESET,
  DELETE_COMMENT_REQUEST,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAIL,
  DELETE_COMMENT_RESET,
  CREATE_REPLY_REQUEST,
  CREATE_REPLY_SUCCESS,
  CREATE_REPLY_FAIL,
  CREATE_REPLY_RESET,
  UPDATE_REPLY_REQUEST,
  UPDATE_REPLY_SUCCESS,
  UPDATE_REPLY_FAIL,
  UPDATE_REPLY_RESET,
  LIKE_REPLY_REQUEST,
  LIKE_REPLY_SUCCESS,
  LIKE_REPLY_FAIL,
  LIKE_REPLY_RESET,
  DELETE_REPLY_REQUEST,
  DELETE_REPLY_SUCCESS,
  DELETE_REPLY_FAIL,
  DELETE_REPLY_RESET,
} from "../constants/comment";

export const useCommentActions = () => {
  const { dispatch } = useCommentContext();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const header = {
    headers: { Authorization: `Bearer ${userInfo?.token}` },
  };
  const createComment = async (id, info) => {
    dispatch({ type: CREATE_COMMENT_REQUEST });
    dispatch({ type: CREATE_COMMENT_RESET });
    try {
      const { data } = await Axios.post(
        `${process.env.REACT_APP_URL}/api/comments/${id}`,
        info,
        header
      );
      dispatch({ type: CREATE_COMMENT_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({ type: CREATE_COMMENT_FAIL, payload: message });
    }
  };

  const editComment = async (info) => {
    dispatch({ type: UPDATE_COMMENT_REQUEST });
    dispatch({ type: UPDATE_COMMENT_RESET });

    try {
      const { data } = await Axios.put(
        `${process.env.REACT_APP_URL}/api/comments/${info.cId}`,
        info,
        header
      );
      dispatch({ type: UPDATE_COMMENT_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({ type: UPDATE_COMMENT_FAIL, payload: message });
    }
  };

  const deleteComment = async (id) => {
    dispatch({ type: DELETE_COMMENT_REQUEST });
    dispatch({ type: DELETE_COMMENT_RESET });

    try {
      const { data } = await Axios.delete(
        `${process.env.REACT_APP_URL}/api/comments/${id}`,

        header
      );
      dispatch({ type: DELETE_COMMENT_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({ type: DELETE_COMMENT_FAIL, payload: message });
    }
  };

  const createReply = async (id, info) => {
    dispatch({ type: CREATE_REPLY_REQUEST });
    dispatch({ type: CREATE_REPLY_RESET });
    try {
      const { data } = await Axios.post(
        `${process.env.REACT_APP_URL}/api/comments/reply/${id}`,
        info,
        header
      );
      dispatch({ type: CREATE_REPLY_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({ type: CREATE_REPLY_FAIL, payload: message });
    }
  };

  const likeComment = async (id) => {
    dispatch({ type: LIKE_COMMENT_REQUEST });
    dispatch({ type: LIKE_COMMENT_RESET });

    try {
      const { data } = await Axios.put(
        `${process.env.REACT_APP_URL}/api/comments/like/${id}`,
        {},
        header
      );

      dispatch({ type: LIKE_COMMENT_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({ type: LIKE_COMMENT_FAIL, payload: message });
    }
  };
  const editReply = async (info) => {
    dispatch({ type: UPDATE_REPLY_REQUEST });
    dispatch({ type: UPDATE_REPLY_RESET });

    try {
      const { data } = await Axios.put(
        `${process.env.REACT_APP_URL}/api/comments/reply/${info.id}`,
        info,
        header
      );
      dispatch({ type: UPDATE_REPLY_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({ type: UPDATE_REPLY_FAIL, payload: message });
    }
  };
  const deleteReply = async (id) => {
    dispatch({ type: DELETE_REPLY_REQUEST });
    dispatch({ type: DELETE_REPLY_RESET });

    try {
      const { data } = await Axios.delete(
        `${process.env.REACT_APP_URL}/api/comments/reply/${id}`,

        header
      );
      dispatch({ type: DELETE_REPLY_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({ type: DELETE_REPLY_FAIL, payload: message });
    }
  };
  const likeReply = async (id) => {
    dispatch({ type: LIKE_REPLY_REQUEST });
    dispatch({ type: LIKE_REPLY_RESET });

    try {
      const { data } = await Axios.put(
        `${process.env.REACT_APP_URL}/api/comments/like-reply/${id}`,
        {},
        header
      );

      dispatch({ type: LIKE_REPLY_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({ type: LIKE_REPLY_FAIL, payload: message });
    }
  };
  return {
    createComment,
    createReply,
    editComment,
    deleteComment,
    likeComment,
    editReply,
    likeReply,
    deleteReply,
  };
};
