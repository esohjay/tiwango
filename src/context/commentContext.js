import React, { useContext, useReducer } from "react";

//import { reducer } from "../reducers/post";
import { commentReducer } from "../reducers/comment";
//import { useCreatePost, useGetPosts } from "../actions/postActions";

const CommentContext = React.createContext();

const initialState = {
  loading: false,
  deletedReply: {},
  deletedComment: {},
  createdComment: {},
  createdReply: {},
  updatedComment: {},
  updatedReply: {},
  likedComment: {},
  likedReply: {},
  success: false,
  commentUpdated: false,
  commentLiked: false,
  replyLiked: false,
  commentDeleted: false,
  replyUpdated: false,
  replyDeleted: false,
  replied: false,
  commented: false,
  error: "",
};

const CommentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(commentReducer, initialState);

  return (
    <CommentContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};
// make sure use
export const useCommentContext = () => {
  return useContext(CommentContext);
};

export { CommentContext, CommentProvider };
