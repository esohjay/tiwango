import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { FaRegHeart, FaRegComment, FaRegBookmark } from "react-icons/fa";
export default function Post({ post, bookmark }) {
  return (
    <article className="post">
      {post && post?.image && (
        <div className="img-container">
          <img src={post?.image?.url} alt={post.title} />
        </div>
      )}

      <div className="post-body">
        <h3>
          <Link to={`/post/${post._id}`}>{post.title}</Link>
        </h3>

        <em>
          posted on{" "}
          {dayjs(post.postDate.substring(0, 10)).format("ddd, MMM D YYYY")}
        </em>
      </div>
      <div className="underline"></div>
      <div className="post-footer">
        <div className="post-footer-author">
          <Link to={`/user/${post?.author?._id}`}>
            <img
              src={
                post && post?.author?.image?.url
                  ? post?.author?.image?.url
                  : "/images/profile.png"
              }
              alt={post?.author?.username}
            />
          </Link>
          <Link to={`/user/${post?.author?._id}`}>
            <p> by {post?.author?.fullname} </p>
          </Link>
        </div>

        <div className="post-options">
          {post.likes?.counts > 0 && <p>{post?.likes?.counts} </p>}
          <div className="post-options-icon">
            {post.likes?.counts > 0 && <FaRegHeart />}
          </div>
          {post?.comments && post?.comments.length > 0 && (
            <p>{post?.comments.length} </p>
          )}
          <div className="post-options-icon">
            {post?.comments && post?.comments.length > 0 && <FaRegComment />}
          </div>
          <div className="post-options-icon">
            <FaRegBookmark onClick={bookmark} />
          </div>
        </div>
      </div>
    </article>
  );
}
