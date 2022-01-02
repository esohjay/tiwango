import React, { useState } from "react";
import { useHistory } from "react-router-dom";
//import { useGlobalContext } from "../context/store";
import { usePostActions } from "../actions/postActions";
export default function SearchForm() {
  const history = useHistory();
  const { setTitle } = usePostActions();

  const [search, setSearch] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setTitle(search);
    history.push(`/posts/search`);
  }
  return (
    <section className="section search">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="name">search for post</label>
          <input
            type="text"
            className="form-input"
            value={search}
            id="name"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </form>
    </section>
  );
}
