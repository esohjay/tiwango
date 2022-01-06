import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context/store";
import { usePostActions } from "../actions/postActions";
import { useCommentActions } from "../actions/commentActions";
import { useCommentContext } from "../context/commentContext";
import CommentSection from "../components/CommentSection";
import Modal from "../components/Modal";
import RelatedPost from "../components/RelatedPost";
import { useParams } from "react-router";
import draftToHtml from "draftjs-to-html";
import { Link, useHistory } from "react-router-dom";
import { UPDATE_POST_RESET } from "../constants/post";
import { CREATE_POST_RESET } from "../constants/post";
import Notification from "../components/Notification";
import Loader from "../components/Loader";
import dayjs from "dayjs";
import {
  FaRegHeart,
  FaRegEdit,
  FaRegTrashAlt,
  FaRegBookmark,
  FaHeart,
} from "react-icons/fa";

import BackButton from "../components/BackButton";
import SocialIcon from "../components/SocialIcon";
import { useUserContext } from "../context/userContext";
//import { convertFromRaw } from "draft-js";
import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { BOOKMARK_POST_RESET } from "../constants/post";
const Post = (props) => {
  const history = useHistory();
  const [isPostModal, setIsPostModal] = useState(false);

  const { state: userState } = useUserContext();
  const { userInfo } = userState;
  const { state, dispatch } = useGlobalContext();
  const { state: commentState } = useCommentContext();
  const {
    createdComment,
    createdReply,
    commentLiked,
    commentDeleted,
    commentUpdated,
    replyUpdated,
    replyLiked,
    replyDeleted,
    updated,
    error: commentError,
  } = commentState;
  const {
    post,
    posts,
    changedStatus,
    postDeleted,
    postUpdated,
    postCreated,
    postLiked,
    bookmarked,
    loading,
    error,
  } = state;
  const { id } = useParams();
  const {
    getPostDetails,
    likePost,
    deletePost,
    getPosts,
    changePostStatus,
    bookmarkPost,
  } = usePostActions();
  const { createComment } = useCommentActions();
  useEffect(() => {
    getPosts({ limit: 5, category: post?.category });
  }, [post.category, getPosts]);
  useEffect(() => {
    dispatch({ type: BOOKMARK_POST_RESET });
    getPostDetails(id);
    setIsPostModal(false);

    //console.log(id);
  }, [
    createdComment,
    updated,
    createdReply,
    replyLiked,
    commentLiked,
    commentUpdated,
    replyUpdated,
    id,
    replyDeleted,
    commentDeleted,
    changedStatus,
    postDeleted,
    postLiked,
    getPostDetails,
    dispatch,
  ]);

  useEffect(() => {
    if (postUpdated) {
      dispatch({ type: UPDATE_POST_RESET });
    }
    if (postCreated) {
      dispatch({ type: CREATE_POST_RESET });
    }
  });

  const openPostModal = (i) => {
    setIsPostModal(true);
  };
  const closePostModal = () => {
    setIsPostModal(false);
  };

  const convertFromJSONToHTML = (text) => {
    try {
      return { __html: draftToHtml(text) };
    } catch (exp) {
      console.log(exp);
      return { __html: "Error" };
    }
  };

  /* const handleSubmit = (e) => {
    e.preventDefault();
    createComment(id, { comment });
    setComment("");
  };*/
  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    validationSchema: Yup.object({
      comment: Yup.string().required("Write comment"),
    }),
    onSubmit: (values, { resetForm }) => {
      createComment(id, values);
      resetForm();
    },
  });
  return (
    <div className="section">
      <BackButton history={history} />
      {error && <p className="error-message">{error}</p>}
      {commentError && <p className="error-message">{commentError}</p>}
      <Modal
        header="Delete Post?"
        message="Post will be deleted permanently"
        action={() => deletePost(post._id)}
        isModalOpen={isPostModal}
        closeModal={closePostModal}
      />

      {postDeleted && (
        <h2 style={{ textAlign: "center", margin: "20px" }}>Post Deleted</h2>
      )}
      {post && (
        <>
          <Notification
            message={"Added to reading list"}
            success={true}
            show={bookmarked}
          />
          {loading && <Loader loading={loading} />}
          <section className="single-post">
            <h2>{post.title}</h2>
            <div className="author-info">
              <div className="author-avatar">
                <img
                  src={
                    post && post?.author?.image?.url
                      ? post?.author?.image?.url
                      : "/images/profile.png"
                  }
                  alt={post?.author?.fullname}
                />
              </div>
              <div className="post-author">
                <em>Written by</em>
                <p>
                  <Link to={`/user/${post?.author?._id}`}>
                    {post?.author?.fullname}
                  </Link>
                </p>
              </div>
              <div className="post-date">
                <em>Posted on</em>
                <p>
                  {dayjs(post?.postDate?.substring(0, 10)).format(
                    "ddd, MMM D YYYY"
                  )}
                </p>
              </div>
            </div>
            {post?.image && (
              <div className="post-img">
                <img
                  src={post && post.image ? post.image.url : ""}
                  alt={post.title}
                />
              </div>
            )}
            <div className="post-options">
              {post?.isDraft ? (
                <>
                  {(userInfo && userInfo?._id === post?.author?._id) ||
                  (userInfo && userInfo?.isAdmin === true) ? (
                    <>
                      <button
                        className="btn-primary"
                        onClick={() =>
                          props.history.push(`/editpost/${post?._id}`)
                        }
                      >
                        Continue Writing
                      </button>
                      <button
                        className="btn"
                        onClick={() =>
                          changePostStatus({ id: post?._id, isDraft: false })
                        }
                      >
                        Publish
                      </button>
                      <button className="btn-delete" onClick={openPostModal}>
                        Delete
                      </button>
                    </>
                  ) : null}
                </>
              ) : (
                <>
                  {post.likes?.counts && <p>{post?.likes?.counts}</p>}
                  <div className="post-options-icon like">
                    {userInfo && !post?.likes?.users.includes(userInfo._id) ? (
                      <FaRegHeart onClick={() => likePost(post._id)} />
                    ) : userInfo &&
                      post?.likes?.users.includes(userInfo._id) ? (
                      <FaHeart onClick={() => likePost(post._id)} />
                    ) : (
                      <p style={{ fontSize: "14px" }}>likes</p>
                    )}
                  </div>
                  {userInfo && (
                    <div className="post-options-icon">
                      <FaRegBookmark
                        onClick={() =>
                          bookmarkPost({ id: post?._id, title: post?.title })
                        }
                      />
                    </div>
                  )}
                  {(userInfo && userInfo?._id === post?.author?._id) ||
                  (userInfo && userInfo?.isAdmin === true) ? (
                    <>
                      <div className="post-options-icon edit">
                        <FaRegEdit
                          onClick={() =>
                            props.history.push(`/editpost/${post?._id}`)
                          }
                        />
                      </div>
                      <div className="post-options-icon delete">
                        <FaRegTrashAlt onClick={openPostModal} />
                      </div>
                    </>
                  ) : null}
                </>
              )}
            </div>
            <div className="tag-list">
              <p>Tags:</p>
              {post?.tags?.map((tag, i) => (
                <em key={`${tag}${i}`}>#{tag} </em>
              ))}
            </div>
            <div className="single-post-info">
              <div
                dangerouslySetInnerHTML={convertFromJSONToHTML(
                  post.description
                )}
              ></div>
            </div>
          </section>
          <section>
            <section className="section-center">
              <h3 className="comment-header">share your thoughts</h3>
              {userInfo ? (
                <form className="form-body" onSubmit={formik.handleSubmit}>
                  <div className="form-control">
                    <textarea
                      type="text"
                      name="comment"
                      className="form-input"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.comment}
                    />
                    {formik.touched.comment && formik.errors.comment ? (
                      <div className="delete">{formik.errors.comment}</div>
                    ) : null}
                  </div>
                  <button type="submit" className="btn btn-primary">
                    comment
                  </button>
                </form>
              ) : (
                <p>
                  Login or Register to
                  <span>
                    <Link to="/signin"> share your thoughts</Link>
                  </span>
                </p>
              )}
            </section>
          </section>
          <section>
            {post.comments && post.comments.length > 0 && (
              <>
                <h3 className="comment-discussion">Discussions</h3>

                <section className="comments">
                  {post?.comments?.map((comment, i) => (
                    <div key={comment._id} className="comment-center">
                      <CommentSection
                        comment={comment}
                        i={i}
                        userInfo={userInfo}
                      />
                    </div>
                  ))}
                </section>
              </>
            )}
          </section>
          <h3 className="author-header">About the Author</h3>
          <div className="author-section">
            <div className="author-img">
              <img
                src={
                  post && post?.author?.image?.url
                    ? post?.author?.image?.url
                    : "/images/profile.png"
                }
                alt={post?.author?.fullname}
              />
            </div>

            <div className="author-details">
              <p>
                <Link to={`/user/${post?.author?._id}`}>
                  {post?.author?.username}
                </Link>
              </p>
              <SocialIcon {...post?.author?.socials} />
              <p>{post?.author?.bio}</p>
            </div>
          </div>
        </>
      )}

      <div className="related-post-container">
        <h3>You might also like:</h3>
        <RelatedPost posts={posts?.posts} />
      </div>
    </div>
  );
};

export default Post;
