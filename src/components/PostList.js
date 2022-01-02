import React, { useEffect } from "react";
import { useGlobalContext } from "../context/store";
import { usePostActions } from "../actions/postActions";
import Pagination from "../components/Pagination";
import Post from "../components/Post";
import Notification from "../components/Notification";
import { BOOKMARK_POST_RESET } from "../constants/post";
import Loader from "../components/Loader";
export default function PostList() {
  const { state, dispatch } = useGlobalContext();
  const { posts, loading, bookmarked, error } = state;
  const { getPosts, bookmarkPost } = usePostActions();
  useEffect(() => {
    dispatch({ type: BOOKMARK_POST_RESET });
    getPosts({});
  }, [getPosts, dispatch]);

  if (posts && posts.posts?.length < 1) {
    return <h2 className="section-title">no posts yet</h2>;
  }

  return (
    <section className="section">
      {error && <p className="error-message">{error}</p>}
      <Notification
        message={"Added to reading list"}
        success={true}
        show={bookmarked}
      />{" "}
      {loading && <Loader size={30} loading={loading} />}
      <div className="post-list-center">
        {posts?.posts?.map((post) => {
          return (
            <div key={post._id}>
              {!post.isDraft && (
                <Post
                  post={post}
                  bookmark={() =>
                    bookmarkPost({ id: post?._id, title: post?.title })
                  }
                />
              )}
            </div>
          );
        })}
      </div>
      {posts && (
        <Pagination
          pageInfo={{
            hasNextPage: posts?.hasNextPage,
            hasPrevPage: posts?.hasPrevPage,
            nextPage: posts?.nextPage,
            prevPage: posts?.prevPage,
            totalPosts: posts?.totalPosts,
            totalPages: posts?.totalPages,
            page: posts?.page,
          }}
        />
      )}
    </section>
  );
}
