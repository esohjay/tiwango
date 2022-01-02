import {
  POST_STATUS_REQUEST,
  POST_STATUS_SUCCESS,
  POST_STATUS_FAIL,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  CREATE_POST_FAIL,
  CREATE_POST_RESET,
  UPDATE_POST_REQUEST,
  UPDATE_POST_SUCCESS,
  UPDATE_POST_FAIL,
  UPDATE_POST_RESET,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  LIKE_POST_FAIL,
  LIKE_POST_RESET,
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
  DELETE_POST_REQUEST,
  DELETE_POST_SUCCESS,
  DELETE_POST_FAIL,
  DELETE_POST_RESET,
  POST_STATUS_RESET,
  SET_CATEGORY,
  SET_TITLE,
  SET_TAG,
  CLEAR_SEARCH,
  SET_CURRENT_PAGE,
  // SET_PREV_PAGE,
  // SET_NEXT_PAGE,
} from "../constants/post";
//const userInfo = JSON.parse(localStorage.getItem("userInfo"));
export const reducer = (state, action) => {
  switch (action.type) {
    case CREATE_POST_REQUEST:
      return { ...state, loading: true };
    case CREATE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        createdPost: action.payload,
        postCreated: true,
      };
    case CREATE_POST_FAIL:
      return { ...state, loading: false, error: action.payload };

    case CREATE_POST_RESET:
      return { ...state, postCreated: false };

    case UPDATE_POST_REQUEST:
      return { ...state, loading: true };
    case UPDATE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        editedPost: action.payload,
        postUpdated: true,
      };
    case UPDATE_POST_FAIL:
      return { ...state, loading: false, error: action.payload };
    case UPDATE_POST_RESET:
      return { ...state, postUpdated: false };

    case ALL_POSTS_REQUEST:
      return { ...state, loading: true };
    case ALL_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        posts: action.payload,
        success: true,
      };
    case ALL_POSTS_FAIL:
      return { ...state, loading: false, error: action.payload };

    case USER_POSTS_REQUEST:
      return { ...state, loading: true };
    case USER_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
        userPosts: action.payload,
        // posts: action.payload,
        userPostsSuccess: true,
      };
    case USER_POSTS_FAIL:
      return { ...state, loading: false, error: action.payload };

    case POST_DETAILS_REQUEST:
      return { ...state, loading: true };
    case POST_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        post: action.payload,
        success: true,
      };
    case POST_DETAILS_FAIL:
      return { ...state, loading: false, error: action.payload };

    case LIKE_POST_REQUEST:
      return { ...state, loading: true, postLiked: false };
    case LIKE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        like: action.payload,
        postLiked: true,
      };

    case LIKE_POST_FAIL:
      return { ...state, loading: false, error: action.payload };
    case LIKE_POST_RESET:
      return { ...state, postLiked: false };
    case POST_STATUS_REQUEST:
      return { ...state, loading: true };
    case POST_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        editedPost: action.payload,
        changedStatus: true,
      };
    case POST_STATUS_FAIL:
      return { ...state, loading: false, error: action.payload };
    case POST_STATUS_RESET:
      return { ...state, changedStatus: false };

    case BOOKMARK_POST_REQUEST:
      return { ...state, loading: true };
    case BOOKMARK_POST_SUCCESS:
      return {
        ...state,
        loading: false,

        bookmarked: true,
      };
    case BOOKMARK_POST_RESET:
      return {
        ...state,

        bookmarked: false,
      };
    case BOOKMARK_POST_FAIL:
      return { ...state, loading: false, error: action.payload };
    case BOOKMARK_POST_REMOVE_REQUEST:
      return { ...state, loading: true };
    case BOOKMARK_POST_REMOVE_SUCCESS:
      return {
        ...state,
        loading: false,

        removedFromBookmark: true,
      };
    case BOOKMARK_POST_REMOVE_RESET:
      return {
        ...state,
        removedFromBookmark: false,
      };
    case BOOKMARK_POST_REMOVE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case DELETE_POST_REQUEST:
      return { ...state, loading: true };
    case DELETE_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        post: {},
        postDeleted: true,
      };
    case DELETE_POST_RESET:
      return {
        ...state,

        postDeleted: false,
      };
    case DELETE_POST_FAIL:
      return { ...state, loading: false, error: action.payload };
    case SET_CATEGORY:
      return { ...state, category: action.payload };
    case SET_TITLE:
      return { ...state, title: action.payload };
    case SET_TAG:
      return { ...state, tag: action.payload };
    case CLEAR_SEARCH:
      return { ...state, title: "", tag: "", category: "" };
    case SET_CURRENT_PAGE:
      return { ...state, page: action.payload };
    /*case SET_PREV_PAGE:
      return { ...state, prevPage: action.payload };
    case SET_NEXT_PAGE:
      return { ...state, nextPage: action.payload };*/
    default:
      return state;
  }
};
