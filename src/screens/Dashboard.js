import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/userContext";
import { useGlobalContext } from "../context/store";
import { useUserActions } from "../actions/userActions";
import { usePostActions } from "../actions/postActions";
import Modal from "../components/Modal";
import { useParams } from "react-router";
import { MdLocationPin, MdVisibilityOff, MdVisibility } from "react-icons/md";
import {
  FaRegEdit,
  FaRegTrashAlt,
  FaTimes,
  // FaHeart,
} from "react-icons/fa";
import SocialIcon from "../components/SocialIcon";

import { Link, useHistory } from "react-router-dom";
import BackButton from "../components/BackButton";
import Loader from "../components/Loader";
function Dashboard(props) {
  const { id } = useParams();
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [isBookmarkModal, setIsBookmarkModal] = useState(false);
  const [isPostModal, setIsPostModal] = useState(false);
  const [index, setIndex] = useState("");
  const [isDraftModal, setIsDraftModal] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [openPassword, setOpenPassword] = useState(false);
  const { getUserDetails, updatePassword } = useUserActions();
  const { state } = useUserContext();
  const { user, updatedPassword, userInfo, loading, error } = state;
  const { getUserPosts, deletePost, changePostStatus, removeFromBookmark } =
    usePostActions();
  const { state: userPostsState } = useGlobalContext();

  const {
    userPosts,
    changedStatus,
    postDeleted,
    removedFromBookmark,
    loading: postLoading,
    error: postError,
  } = userPostsState;
  const openBookmarkModal = (i) => {
    setIsBookmarkModal(true);
    setIndex(i);
  };
  const closeBookmarkModal = () => {
    setIsBookmarkModal(false);
  };
  const openPostModal = (i) => {
    setIsPostModal(true);
    setIndex(i);
  };
  const closePostModal = () => {
    setIsPostModal(false);
  };
  const openDraftModal = (i) => {
    setIsDraftModal(true);
    setIndex(i);
  };
  const closeDraftModal = () => {
    setIsDraftModal(false);
  };
  useEffect(() => {
    getUserDetails(id);
    //getPosts(id);
    setIsBookmarkModal(false);
    setIsPostModal(false);
    setIsDraftModal(false);
    getUserPosts(id);

    if (updatedPassword) {
      setConfirmPassword("");
      setPassword("");
      setCurrentPassword("");
      setOpenPassword(false);
    }
  }, [
    updatedPassword,
    changedStatus,
    postDeleted,
    removedFromBookmark,
    getUserDetails,
    getUserPosts,
    id,
  ]);
  const editPage = () => {
    props.history.push(`/updateprofile/${id}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      window.alert("password do not match");
    } else {
      updatePassword({
        id,
        currentPassword,
        password,
      });
    }
  };

  return (
    <div className="section">
      {error && <p className="error-message">{error}</p>}
      {postError && <p className="error-message">{postError}</p>}
      <BackButton history={history} />
      {loading && <Loader loading={loading} />}
      <section className="section-center">
        <article className="card">
          <img
            src={user?.image?.url ? user?.image?.url : "/images/profile.png"}
            alt={user?.fullname}
          />
          {userInfo?._id === user?._id && !user?.image?.url && (
            <p>
              <Link to={`/updateprofile/${id}`}>Upload Image</Link>
            </p>
          )}
          <h4>{user?.fullname}</h4>
          <p> @{user?.username} </p>

          <h4>{user?.email}</h4>
          {user?.location && (
            <p>
              <MdLocationPin /> {user?.location}
            </p>
          )}
          {userInfo?._id === user?._id && !user?.location && (
            <p>
              <Link to={`/updateprofile/${id}`}>
                <MdLocationPin />
                Add location
              </Link>
            </p>
          )}
          <SocialIcon {...user?.socials} />
          {userInfo?._id === user?._id && (
            <button className="btn btn-primary" onClick={editPage}>
              Update profile
            </button>
          )}
        </article>
      </section>
      <div className="section-center">
        <div className="card-center">
          <h4>Bio</h4>
          <p>{user?.bio}</p>
          {userInfo?._id === user?._id && !user?.bio && (
            <Link to={`/updateprofile/${id}`}>Briefly describe yourself</Link>
          )}
        </div>
      </div>
      {postLoading && <Loader loading={postLoading} />}
      <div className="section-center">
        <div className="card-center">
          {userInfo?._id === user?._id ? (
            <h4>Manage Posts</h4>
          ) : (
            <h4 style={{ textAlign: "center" }}>Posts by {user.username}</h4>
          )}

          {userPosts?.map((post, i) => (
            <div key={post._id}>
              {i === index && (
                <Modal
                  header="Delete Post?"
                  message="Post will be deleted permanently"
                  action={() => deletePost(post._id)}
                  isModalOpen={isPostModal}
                  closeModal={closePostModal}
                />
              )}
              {!post.isDraft && (
                <div className="post-mgt-list">
                  <p>
                    <Link to={`/post/${post._id}`}>{post.title}</Link>
                  </p>

                  {userInfo?._id === user?._id && (
                    <div className="post-options">
                      <div className="post-options-icon">
                        <MdVisibilityOff
                          onClick={() =>
                            changePostStatus({ id: post._id, isDraft: true })
                          }
                        />
                      </div>
                      <div className="post-options-icon delete">
                        <FaRegTrashAlt onClick={() => openPostModal(i)} />
                      </div>

                      <div className="post-options-icon edit">
                        <FaRegEdit
                          onClick={() =>
                            props.history.push(`/editpost/${post?._id}`)
                          }
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {userInfo?._id === user?._id && (
        <>
          <div className="section-center">
            <div className="card-center">
              <h4>Drafted Posts</h4>
              <p>
                Posts here are hidden from other users. Click on the eye icon to
                make them visible.
              </p>
              {userPosts?.map((post, i) => (
                <div key={post._id}>
                  {i === index && (
                    <Modal
                      header="Delete?"
                      message="Post will be deleted permanently"
                      action={() => deletePost(post._id)}
                      isModalOpen={isDraftModal}
                      closeModal={closeDraftModal}
                    />
                  )}
                  {post.isDraft && (
                    <div className="post-mgt-list">
                      <p>
                        <Link to={`/post/${post._id}`}>{post.title}</Link>
                      </p>
                      <div className="post-options">
                        <div className="post-options-icon">
                          <MdVisibility
                            onClick={() =>
                              changePostStatus({ id: post._id, isDraft: false })
                            }
                          />
                        </div>
                        <div className="post-options-icon delete">
                          <FaRegTrashAlt onClick={() => openDraftModal(i)} />
                        </div>
                        <div className="post-options-icon edit">
                          <FaRegEdit
                            onClick={() =>
                              props.history.push(`/editpost/${post?._id}`)
                            }
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="section-center">
            <div className="card-center">
              <h4>Reading List</h4>
              {user?.bookmarkedPosts?.map((post, i) => (
                <div key={`${post.id}${i}`}>
                  {!post.isDraft && (
                    <div className="post-mgt-list">
                      <p>
                        <Link to={`/post/${post.id}`}>{post.title}</Link>
                      </p>
                      <div className="post-options">
                        <div className="post-options-icon delete">
                          <FaTimes onClick={() => openBookmarkModal(i)} />
                          {i === index && (
                            <Modal
                              header="Remove?"
                              message="Post will be removed from your reading lists."
                              action={() => removeFromBookmark(post.id)}
                              isModalOpen={isBookmarkModal}
                              closeModal={closeBookmarkModal}
                              openModal={openBookmarkModal}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="change-pw">
            <button
              className="btn btn-primary"
              onClick={() => setOpenPassword(!openPassword)}
            >
              Change Password
            </button>
          </div>

          {openPassword && (
            <div className="section-center">
              <div className="card-center">
                <form onSubmit={handleSubmit}>
                  <div className="form-control">
                    <label htmlFor="password"> Current Password</label>
                    <input
                      type="text"
                      name="password"
                      id="password"
                      className="form-input"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-control">
                    <label htmlFor="password"> New Password</label>
                    <input
                      type="text"
                      name="password"
                      id="password"
                      className="form-input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="form-control">
                    <label htmlFor="ConfirmPassword">Confirm Password</label>
                    <input
                      type="text"
                      name="ConfirmPassword"
                      id="ConfirmPassword"
                      className="form-input"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <button className="btn-block btn">Change Password</button>
                </form>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Dashboard;
