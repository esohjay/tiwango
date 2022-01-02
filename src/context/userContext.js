import React, { useContext, useReducer } from "react";

//import { reducer } from "../reducers/post";
import { userReducer } from "../reducers/user";
//import { useCreatePost, useGetPosts } from "../actions/postActions";

const UserContext = React.createContext();
const userInfo = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : undefined;
const initialState = {
  loading: false,
  updatedUser: false,
  userInfo,
  updatedPassword: false,
  user: {},
  users: [],
  message: {},
  messageSent: false,
  success: false,
  madeAdmin: false,
  userDeleted: false,
};

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
// make sure use
export const useUserContext = () => {
  return useContext(UserContext);
};

export { UserContext, UserProvider };
