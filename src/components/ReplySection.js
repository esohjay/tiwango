import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCommentActions } from "../actions/commentActions";
import { FaRegHeart, FaRegEdit, FaRegTrashAlt, FaHeart } from "react-icons/fa";
import { useCommentContext } from "../context/commentContext";
import Modal from "../components/Modal";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
export default function ReplySection({ reply, userInfo, i }) {
  const [replyEdit, setReplyEdit] = useState("");
  const [showReplyEdit, setShowReplyEdit] = useState(false);
  const [isReplyModal, setIsReplyModal] = useState(false);
  const [index, setIndex] = useState("");
  const [showError, setShowError] = useState(false);
  // const [text, setText] = useState("");
  const { editReply, deleteReply, likeReply } = useCommentActions();
  const { state } = useCommentContext();
  const { replyUpdated, replyDeleted, error } = state;
  const editReplyBtn = (id) => {
    if (!replyEdit) {
      setShowError(true);
    } else {
      editReply({ reply: replyEdit, id });
    }
  };
  const handleShowReplyEdit = (reply) => {
    setShowReplyEdit(!showReplyEdit);

    setReplyEdit(reply);
  };
  const openReplyModal = () => {
    setIsReplyModal(true);
    setIndex(i);
  };
  const closeReplyModal = () => {
    setIsReplyModal(false);
  };
  useEffect(() => {
    setShowReplyEdit(false);
  }, [replyUpdated, replyDeleted]);
  return (
    <div>
      {error && <p className="error-message">{error}</p>}
      {i === index && (
        <Modal
          header="Delete?"
          message="Your reply will be deleted permanently"
          action={() => deleteReply(reply._id)}
          isModalOpen={isReplyModal}
          closeModal={closeReplyModal}
        />
      )}
      <div className="comment-author">
        <div className="avater">
          <img
            src={
              reply?.author?.image?.url
                ? reply?.author?.image?.url
                : "/images/profile.png"
            }
            alt={reply?.author?.username}
            className="photo"
          />
        </div>

        <div className="name-time">
          <Link to={`/user/${reply.author._id}`}>{reply.author.username}</Link>
          <p>{dayjs(reply?.createdAt).fromNow()}</p>
        </div>
      </div>
      {showReplyEdit ? (
        <>
          <div style={{ marginBottom: "30px", marginTop: "30px" }}>
            <div className="form-control">
              <textarea
                type="text "
                className="form-input-sec"
                value={replyEdit}
                onChange={(e) => setReplyEdit(e.target.value)}
              />
            </div>
            {showError && (
              <p style={{ color: "red", margin: "0" }}>Enter reply</p>
            )}
            <button
              type="submit"
              className="btn-brown"
              onClick={() => editReplyBtn(reply._id)}
            >
              Edit
            </button>
          </div>
        </>
      ) : (
        <p>{reply.reply}</p>
      )}

      <div className="comment-icons">
        <div className="comment-icon">
          {reply.likes.counts > 0 ? (
            <p>
              {reply.likes.counts}
              {!userInfo && reply.likes.counts <= 1
                ? "like"
                : !userInfo && reply.likes.counts > 1
                ? "likes"
                : null}
            </p>
          ) : null}
        </div>

        <div className="like comment-icon">
          {userInfo && !reply?.likes?.users.includes(userInfo._id) ? (
            <FaRegHeart onClick={() => likeReply(reply._id)} />
          ) : userInfo && reply?.likes?.users.includes(userInfo._id) ? (
            <FaHeart onClick={() => likeReply(reply._id)} />
          ) : null}
        </div>

        {(userInfo && userInfo?._id === reply?.author?._id) ||
        (userInfo && userInfo?.isAdmin === true) ? (
          <>
            <div className="edit comment-icon">
              <FaRegEdit onClick={() => handleShowReplyEdit(reply.reply)} />
            </div>
            <div className="delete comment-icon">
              <FaRegTrashAlt onClick={openReplyModal} />
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
