import React from "react";
import SearchForm from "../components/SearchForm";
import PostList from "../components/PostList";

function Homepage() {
  return (
    <main>
      <SearchForm />

      <PostList />
    </main>
  );
}

export default Homepage;
