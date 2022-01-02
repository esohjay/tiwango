import React, { useContext, useReducer, useState } from "react";

import { reducer } from "../reducers/post";
//import { commentReducer } from "../reducers/comment";
//import { useCreatePost, useGetPosts } from "../actions/postActions";

const AppContext = React.createContext();

const initialState = {
  loading: false,
  error: "",
  posts: [],
  post: {},
  postDeleted: false,
  createdPost: undefined,
  editedPost: undefined,
  changedStatus: false,
  success: false,
  bookmarked: false,
  postLiked: false,
  userPosts: [],
  userPostsSuccess: false,
  postUpdated: false,
  postCreated: false,
  removedFromBookmark: false,
  category: "",
  tag: "",
  title: "",
  page: 1,

  // prevPage: "",
  // nextPage: "",
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        isModalOpen,
        openModal,
        closeModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
