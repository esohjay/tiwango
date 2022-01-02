import React, { useEffect } from "react";
import { useGlobalContext } from "../context/store";
import { usePostActions } from "../actions/postActions";
import Pagination from "../components/Pagination";
import Post from "../components/Post";
import Loader from "../components/Loader";
import BackButton from "../components/BackButton";
import { useHistory } from "react-router-dom";
export default function SearchResult() {
  const history = useHistory();
  //const { category, tag, title } = useParams();
  const { state } = useGlobalContext();
  const { posts, loading, category, tag, title, error } = state;
  const { getPosts } = usePostActions();
  useEffect(() => {
    getPosts({ category, tags: tag, title, searchScreen: true });
  }, [category, tag, title, getPosts]);

  if (posts && posts.posts?.length < 1) {
    return (
      <h2 className="section-title">no posts matched your search criteria</h2>
    );
  }

  return (
    <section className="section">
      {error && <p className="error-message">{error}</p>}
      <BackButton history={history} />
      {loading && <Loader loading={loading} />}
      <h2 className="section-title">
        {posts?.posts?.length}{" "}
        {posts?.posts?.length <= 1 ? "post found" : "posts found"}
      </h2>
      <div className="post-list-center">
        {posts.posts?.map((post) => {
          return <Post key={post._id} post={post} />;
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
