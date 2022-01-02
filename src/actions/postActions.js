import { useCallback } from "react";
import Axios from "axios";
import { useGlobalContext } from "../context/store";
import {
  POST_STATUS_REQUEST,
  POST_STATUS_SUCCESS,
  POST_STATUS_FAIL,
  POST_STATUS_RESET,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAIL,
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAIL,
  DELETE_POST_RESET,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAIL,
  ALL_POSTS_REQUEST,
  ALL_POSTS_SUCCESS,
  ALL_POSTS_FAIL,
  POST_DETAILS_REQUEST,
  POST_DETAILS_SUCCESS,
  POST_DETAILS_FAIL,
  USER_POSTS_REQUEST,
  USER_POSTS_SUCCESS,
  USER_POSTS_FAIL,
  BOOKMARK_POST_REQUEST,
  BOOKMARK_POST_SUCCESS,
  BOOKMARK_POST_FAIL,
  BOOKMARK_POST_RESET,
  BOOKMARK_POST_REMOVE_REQUEST,
  BOOKMARK_POST_REMOVE_SUCCESS,
  BOOKMARK_POST_REMOVE_FAIL,
  BOOKMARK_POST_REMOVE_RESET,
  SET_CATEGORY,
  SET_TITLE,
  SET_TAG,
  CLEAR_SEARCH,
  SET_CURRENT_PAGE,
  //SET_PREV_PAGE,
  // SET_NEXT_PAGE,
} from "../constants/post";
export const usePostActions = () => {
  const { dispatch } = useGlobalContext();

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const header = {
    headers: { Authorization: `Bearer ${userInfo?.token}` },
  };
  const createPost = async (info, history) => {
    dispatch({ type: CREATE_POST_REQUEST });

    try {
      const { data } = await Axios.post(
        `${process.env.REACT_APP_URL}/api/posts`,
        info,
        header
      );
      dispatch({ type: CREATE_POST_SUCCESS, payload: data });
      history.push(`/post/${data._id}`);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({ type: CREATE_POST_FAIL, payload: message });
    }
  };

  const getPosts = useCallback(
    async ({
      page = 1,
      limit = 20,
      tags = "",
      title = "",
      category = "",
      searchScreen = false,
    }) => {
      dispatch({ type: ALL_POSTS_REQUEST });
      try {
        const { data } = await Axios.get(
          `${process.env.REACT_APP_URL}/api/posts?page=${page}&limit=${limit}&searchScreen=${searchScreen}&tags=${tags}&title=${title}&category=${category}`
        );
        dispatch({ type: ALL_POSTS_SUCCESS, payload: data });
        dispatch({ type: SET_CURRENT_PAGE, payload: data.page });
        // dispatch({ type: SET_PREV_PAGE, payload: data.prevPage });
        // dispatch({ type: SET_NEXT_PAGE, payload: data.nextPage });
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({ type: ALL_POSTS_FAIL, payload: message });
      }
    },
    [dispatch]
  );

  const getPostDetails = useCallback(
    async (id) => {
      dispatch({ type: POST_DETAILS_REQUEST });
      try {
        const { data } = await Axios.get(
          `${process.env.REACT_APP_URL}/api/posts/${id}`
        );
        dispatch({ type: POST_DETAILS_SUCCESS, payload: data });
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({ type: POST_DETAILS_FAIL, payload: message });
      }
    },
    [dispatch]
  );

  const getUserPosts = useCallback(
    async (id) => {
      dispatch({ type: USER_POSTS_REQUEST });
      try {
        const { data } = await Axios.get(
          `${process.env.REACT_APP_URL}/api/posts/user/${id}`
        );
        dispatch({ type: USER_POSTS_SUCCESS, payload: data });
      } catch (error) {
        const message =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;
        dispatch({ type: USER_POSTS_FAIL, payload: message });
      }
    },
    [dispatch]
  );

  const likePost = async (id) => {
    dispatch({ type: LIKE_POST_REQUEST });

    try {
      const { data } = await Axios.put(
        `${process.env.REACT_APP_URL}/api/posts/like/${id}`,
        {},
        header
      );

      dispatch({ type: LIKE_POST_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({ type: LIKE_POST_FAIL, payload: message });
    }
  };
  const changePostStatus = async (info) => {
    dispatch({ type: POST_STATUS_REQUEST });
    dispatch({ type: POST_STATUS_RESET });

    try {
      const { data } = await Axios.put(
        `${process.env.REACT_APP_URL}/api/posts/status/${info.id}`,
        info,
        header
      );

      dispatch({ type: POST_STATUS_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({ type: POST_STATUS_FAIL, payload: message });
    }
  };

  const editPost = async (info, history) => {
    dispatch({ type: UPDATE_POST_REQUEST });

    try {
      const { data } = await Axios.put(
        `${process.env.REACT_APP_URL}/api/posts/${info.id}`,
        info,
        header
      );

      dispatch({ type: UPDATE_POST_SUCCESS, payload: data });
      history.push(`/post/${data._id}`);
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({ type: UPDATE_POST_FAIL, payload: message });
    }
  };
  const bookmarkPost = async (info) => {
    dispatch({ type: BOOKMARK_POST_REQUEST });
    dispatch({ type: BOOKMARK_POST_RESET });
    try {
      const { data } = await Axios.put(
        `${process.env.REACT_APP_URL}/api/users/bookmark-posts`,
        info,
        header
      );
      dispatch({ type: BOOKMARK_POST_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: BOOKMARK_POST_FAIL, payload: message });
    }
  };
  const removeFromBookmark = async (id) => {
    dispatch({ type: BOOKMARK_POST_REMOVE_REQUEST });
    dispatch({ type: BOOKMARK_POST_REMOVE_RESET });
    try {
      const { data } = await Axios.put(
        `${process.env.REACT_APP_URL}/api/users/bookmark-posts/remove/${id}`,
        {},
        header
      );
      dispatch({ type: BOOKMARK_POST_REMOVE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: BOOKMARK_POST_REMOVE_FAIL, payload: message });
    }
  };
  const setCategory = (category) => {
    dispatch({ type: SET_CATEGORY, payload: category });
  };
  const clearSearch = () => {
    dispatch({ type: CLEAR_SEARCH });
  };
  const setTitle = (title) => {
    dispatch({ type: SET_TITLE, payload: title });
  };
  const setTag = (tag) => {
    dispatch({ type: SET_TAG, payload: tag });
  };
  const deletePost = async (id) => {
    dispatch({ type: DELETE_POST_REQUEST });
    dispatch({ type: DELETE_POST_RESET });

    try {
      const { data } = await Axios.delete(
        `${process.env.REACT_APP_URL}/api/posts/${id}`,
        header
      );

      dispatch({ type: DELETE_POST_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      dispatch({ type: DELETE_POST_FAIL, payload: message });
    }
  };
  return {
    createPost,
    getPosts,
    getPostDetails,
    likePost,
    editPost,
    deletePost,
    changePostStatus,
    getUserPosts,
    bookmarkPost,
    removeFromBookmark,
    setTitle,
    setCategory,
    setTag,
    clearSearch,
  };
};
