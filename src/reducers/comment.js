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

export const commentReducer = (state, action) => {
  switch (action.type) {
    case CREATE_COMMENT_REQUEST:
      return { ...state, loading: true };
    case CREATE_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        createdComment: action.payload,
        commented: true,
      };
    case CREATE_COMMENT_RESET:
      return {
        ...state,

        commented: false,
      };
    case CREATE_COMMENT_FAIL:
      return { ...state, loading: false, error: action.payload };

    //Repliess
    case CREATE_REPLY_REQUEST:
      return { ...state, loading: true };
    case CREATE_REPLY_SUCCESS:
      return {
        ...state,
        loading: false,
        createdReply: action.payload,
        replied: true,
      };
    case CREATE_REPLY_RESET:
      return {
        ...state,

        replied: false,
      };
    case CREATE_REPLY_FAIL:
      return { ...state, loading: false, error: action.payload };

    //Update Comment
    case UPDATE_COMMENT_REQUEST:
      return { ...state, loading: true };
    case UPDATE_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        updatedComment: action.payload,
        commentUpdated: true,
      };
    case UPDATE_COMMENT_RESET:
      return {
        ...state,

        commentUpdated: false,
      };
    case UPDATE_COMMENT_FAIL:
      return { ...state, loading: false, error: action.payload };

    //Update Reply
    case UPDATE_REPLY_REQUEST:
      return { ...state, loading: true };
    case UPDATE_REPLY_SUCCESS:
      return {
        ...state,
        loading: false,
        updatedReply: action.payload,
        replyUpdated: true,
      };
    case UPDATE_REPLY_RESET:
      return {
        ...state,

        replyUpdated: false,
      };
    case UPDATE_REPLY_FAIL:
      return { ...state, loading: false, error: action.payload };

    // Delete Repliess
    case DELETE_REPLY_REQUEST:
      return { ...state, loading: true };
    case DELETE_REPLY_SUCCESS:
      return {
        ...state,
        loading: false,
        deletedReply: action.payload,
        replyDeleted: true,
      };
    case DELETE_REPLY_RESET:
      return {
        ...state,
        loading: false,

        replyDeleted: false,
      };
    case DELETE_REPLY_FAIL:
      return { ...state, loading: false, error: action.payload };

    // Delete Comment
    case DELETE_COMMENT_REQUEST:
      return { ...state, loading: true };
    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        deletedComment: action.payload,
        commentDeleted: true,
      };
    case DELETE_COMMENT_RESET:
      return {
        ...state,

        commentDeleted: false,
      };
    case DELETE_COMMENT_FAIL:
      return { ...state, loading: false, error: action.payload };

    // Like Repliess
    case LIKE_REPLY_REQUEST:
      return { ...state, loading: true };
    case LIKE_REPLY_SUCCESS:
      return {
        ...state,
        loading: false,
        likedReply: action.payload,
        replyLiked: true,
      };
    case LIKE_REPLY_FAIL:
      return { ...state, loading: false, error: action.payload };
    case LIKE_REPLY_RESET:
      return { ...state, replyLiked: false };

    // Like Comment
    case LIKE_COMMENT_REQUEST:
      return { ...state, loading: true };
    case LIKE_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        likedComment: action.payload,
        commentLiked: true,
      };
    case LIKE_COMMENT_FAIL:
      return { ...state, loading: false, error: action.payload };
    case LIKE_COMMENT_RESET:
      return { ...state, commentLiked: false };

    default:
      return state;
  }
};
