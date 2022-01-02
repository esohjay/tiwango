import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context/store";
import { usePostActions } from "../actions/postActions";
import Pagination from "../components/Pagination";
import Modal from "../components/Modal";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdVisibilityOff, MdVisibility } from "react-icons/md";
import { useHistory, Link } from "react-router-dom";
import BackButton from "../components/BackButton";
import Loader from "../components/Loader";
function AllPosts(props) {
  const history = useHistory();
  const { state } = useGlobalContext();
  const [isPostModal, setIsPostModal] = useState(false);
  const [search, setSearch] = useState("");
  const { posts, loading, postDeleted, changedStatus, error } = state;
  const [index, setIndex] = useState("");
  const { getPosts, changePostStatus, deletePost } = usePostActions();
  useEffect(() => {
    setIsPostModal(false);
    getPosts({});
  }, [postDeleted, changedStatus, getPosts]);
  const openPostModal = (i) => {
    setIsPostModal(true);
    setIndex(i);
  };
  const closePostModal = () => {
    setIsPostModal(false);
  };
  function handleSubmit(e) {
    e.preventDefault();
    getPosts({ title: search });
  }
  return (
    <div className="section">
      {error && <p className="error-message">{error}</p>}
      <BackButton history={history} />
      {loading && <Loader size={30} loading={loading} />}
      <section className="section search">
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="title">search for post</label>
            <input
              type="text"
              className="form-input"
              value={search}
              placeholder="post title"
              id="title"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </form>
      </section>
      <div>
        <table className="table">
          <tbody>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
            {posts?.posts?.map((post, i) => (
              <tr key={post._id}>
                <td>
                  <Link to={`/post/${post._id}`}>{post.title}</Link>
                </td>
                <td>{post.category}</td>
                <td>
                  <div className="post-options">
                    {post.isDraft && (
                      <div className="post-options-icon">
                        <MdVisibilityOff
                          onClick={() =>
                            changePostStatus({ id: post._id, isDraft: false })
                          }
                        />
                      </div>
                    )}
                    {!post.isDraft && (
                      <div className="post-options-icon">
                        <MdVisibility
                          onClick={() =>
                            changePostStatus({ id: post._id, isDraft: true })
                          }
                        />
                      </div>
                    )}
                    {i === index && (
                      <Modal
                        header="Delete?"
                        message="Post will be deleted permanently"
                        action={() => deletePost(post._id)}
                        isModalOpen={isPostModal}
                        closeModal={closePostModal}
                      />
                    )}
                    <div className="post-options-icon delete">
                      <FaRegTrashAlt onClick={() => openPostModal(i)} />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
    </div>
  );
}

export default AllPosts;
