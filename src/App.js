import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AddPost from "./screens/AddPost";
import Dashboard from "./screens/Dashboard";
import EditPost from "./screens/EditPost";
import SearchResult from "./screens/SearchResult";
import Homepage from "./screens/HomePage";
import Post from "./screens/Post";
import Register from "./screens/Register";
import UpdateUser from "./screens/UpdateUser";
import Signin from "./screens/Signin";
import AllPosts from "./screens/AllPosts";
import AllUsers from "./screens/AllUsers";
import Error from "./screens/Error";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <PrivateRoute path="/addpost" component={AddPost}></PrivateRoute>
        <Route path="/posts/search" exact component={SearchResult}></Route>
        <AdminRoute path="/allposts" exact component={AllPosts}></AdminRoute>
        <AdminRoute path="/allusers" exact component={AllUsers}></AdminRoute>
        <Route path="/" exact component={Homepage}></Route>
        <PrivateRoute
          path="/user/:id"
          exact
          component={Dashboard}
        ></PrivateRoute>
        <Route path="/signin" exact component={Signin}></Route>
        <Route path="/register" exact component={Register}></Route>
        <Route path="/post/:id" exact component={Post}></Route>
        <PrivateRoute
          path="/editpost/:id"
          exact
          component={EditPost}
        ></PrivateRoute>
        <PrivateRoute
          path="/updateprofile/:id"
          exact
          component={UpdateUser}
        ></PrivateRoute>
        <Route path="*" component={Error}></Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
