import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCommentContext } from "../context/commentContext";
import { useCommentActions } from "../actions/commentActions";
//import { usePostActions } from "../actions/postActions";
import ReplySection from "../components/ReplySection";
import Modal from "../components/Modal";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import {
  FaRegHeart,
  FaReply,
  FaRegEdit,
  FaRegTrashAlt,
  FaHeart,
} from "react-icons/fa";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
//import { LIKE_COMMENT_RESET } from "../constants/comment";
export default function CommentSection({ comment, userInfo, i }) {
  const [commentEdit, setCommentEdit] = useState("");
  const [showError, setShowError] = useState(false);
  const [showCommentError, setShowCommentError] = useState(false);
  const [isCommentModal, setIsCommentModal] = useState(false);
  const [index, setIndex] = useState("");
  const [showCommentEdit, setShowCommentEdit] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [replyBox, setReplyBox] = useState(false);
  const [reply, setReply] = useState("");
  const { state } = useCommentContext();
  const { createdReply, commentUpdated, commentDeleted, error } = state;
  // const [text, setText] = useState("");
  const { createReply, editComment, deleteComment, likeComment } =
    useCommentActions();
  // const { getPostDetails } = usePostActions();
  const editCommentBtn = (cId) => {
    if (!commentEdit) {
      setShowCommentError(true);
    } else {
      editComment({ comment: commentEdit, cId });
    }
  };
  const handleShowCommentEdit = (comment) => {
    setShowCommentEdit(!showCommentEdit);

    setCommentEdit(comment);
  };
  const openCommentModal = () => {
    setIsCommentModal(true);
    setIndex(i);
  };
  const closeCommentModal = () => {
    setIsCommentModal(false);
  };
  const handleReplySubmit = (id) => {
    if (!reply) {
      setShowError(true);
    } else {
      createReply(id, { reply });
    }
  };
  useEffect(() => {
    setShowCommentEdit(false);
    setIsCommentModal(false);
    setReplyBox(false);

    if (createdReply) {
      setReply("");
    }
  }, [createdReply, commentUpdated, commentDeleted]);

  const handleLike = async (id) => {
    await likeComment(id);

    //dispatch({ type: LIKE_COMMENT_RESET });
  };

  return (
    <div>
      {error && <p className="error-message">{error}</p>}
      {i === index && (
        <Modal
          header="Delete?"
          message="Your comment will be deleted permanently"
          action={() => deleteComment(comment._id)}
          isModalOpen={isCommentModal}
          closeModal={closeCommentModal}
        />
      )}
      <div className="comment-author">
        <div className="avater">
          <img
            src={
              comment?.author?.image?.url
                ? comment?.author?.image?.url
                : "/images/profile.png"
            }
            alt={comment?.author?.username}
            className="photo"
          />
        </div>
        <div className="name-time">
          <Link to={`/user/${comment.author._id}`}>
            {comment?.author?.username}
          </Link>
          <p>{dayjs(comment?.createdAt).fromNow()}</p>
        </div>
      </div>
      {showCommentEdit ? (
        <div style={{ marginBottom: "30px" }}>
          <div className="form-control">
            <textarea
              type="text "
              className="form-input-sec"
              value={commentEdit}
              onChange={(e) => setCommentEdit(e.target.value)}
            />
          </div>
          {showCommentError && (
            <p style={{ color: "red", margin: "0" }}>Enter comment</p>
          )}
          <button
            type="submit"
            className="btn-brown"
            onClick={() => editCommentBtn(comment._id)}
          >
            Edit
          </button>
        </div>
      ) : (
        <p>{comment?.comment}</p>
      )}

      <div className="comment-icons">
        <div className="comment-icon">
          {comment.likes.counts > 0 ? (
            <p>
              {comment.likes.counts}
              {!userInfo && comment.likes.counts <= 1
                ? "like"
                : !userInfo && comment.likes.counts > 1
                ? "likes"
                : null}
            </p>
          ) : null}
        </div>

        <div className="like comment-icon">
          {userInfo && !comment?.likes?.users.includes(userInfo._id) ? (
            <FaRegHeart onClick={() => handleLike(comment._id)} />
          ) : userInfo && comment?.likes?.users.includes(userInfo._id) ? (
            <FaHeart onClick={() => handleLike(comment._id)} />
          ) : null}
        </div>

        <div className="comment-icon">
          <FaReply onClick={() => setReplyBox(!replyBox)} />
        </div>

        {(userInfo && userInfo?._id === comment?.author?._id) ||
        (userInfo && userInfo?.isAdmin === true) ? (
          <>
            <div className="edit comment-icon">
              <FaRegEdit
                onClick={() => handleShowCommentEdit(comment.comment)}
              />
            </div>
            <div className="delete comment-icon">
              <FaRegTrashAlt onClick={openCommentModal} />
            </div>
          </>
        ) : null}
      </div>
      {replyBox && userInfo ? (
        <div>
          <div className="form-control">
            <textarea
              type="text "
              className="form-input-mini form-input-sec"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
            />
          </div>
          {showError && (
            <p style={{ color: "red", margin: "0" }}>Enter reply</p>
          )}
          <button
            type="submit"
            onClick={() => handleReplySubmit(comment._id)}
            className="btn-brown"
          >
            reply
          </button>
        </div>
      ) : !replyBox && userInfo ? null : !replyBox && !userInfo ? null : (
        <p>
          Login or Register to
          <span>
            <Link to="/signin"> reply</Link>
          </span>
        </p>
      )}
      {comment.replies.length > 0 && (
        <div
          className="reply-notification"
          onClick={() => setShowReplies(!showReplies)}
        >
          <h5>
            ({comment.replies.length})
            {comment.replies.length === 1 ? "Reply" : "Replies"}
          </h5>
          <div className="reply-notification-icon">
            {showReplies ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
          </div>
        </div>
      )}

      {showReplies &&
        comment.replies.map((reply, rIndex) => (
          <section key={reply._id} className="reply">
            <ReplySection reply={reply} userInfo={userInfo} i={rIndex} />
          </section>
        ))}
    </div>
  );
}
