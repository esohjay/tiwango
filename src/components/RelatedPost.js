import React from "react";
//import { useGlobalContext } from "../context/store";
//import { usePostActions } from "../actions/postActions";
import { Link } from "react-router-dom";

export default function RelatedPost({ posts }) {
  return (
    <div className="related-posts">
      <ul>
        {posts?.map((post) => {
          return (
            <div>
              {!post.isDraft && (
                <li key={post._id}>
                  <div className="related-post">
                    <img
                      src={post.image ? post?.image.url : ""}
                      alt={post?.title}
                      className="photo"
                    />

                    <Link to={`/post/${post._id}`}>{post.title}</Link>
                  </div>
                </li>
              )}
            </div>
          );
        })}
      </ul>
    </div>
  );
}
