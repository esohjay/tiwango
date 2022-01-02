import React from "react";

import { Link } from "react-router-dom";

export default function AdminDropdown({ show }) {
  return (
    <>
      {show && (
        <ul className="dropdown">
          <li>
            <Link to="/allusers">All Users</Link>
          </li>
          <li>
            <Link to="/allposts">All Posts</Link>
          </li>
        </ul>
      )}
    </>
  );
}
