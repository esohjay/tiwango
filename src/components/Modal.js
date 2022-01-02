import React from "react";

import { FaTimes } from "react-icons/fa";
const Modal = ({
  message,
  header,
  action,
  closeModal,
  isModalOpen,
  openModal,
}) => {
  // const { isModalOpen, closeModal } = useGlobalContext();
  return (
    <>
      {
        <div
          className={`${
            isModalOpen ? "modal-overlay show-modal" : "modal-overlay"
          }`}
        >
          <div className="modal-container">
            <button className="close-modal-btn" onClick={closeModal}>
              <FaTimes></FaTimes>
            </button>
            <div className="modal-body">
              <h3>{header}</h3>
              <p>{message}</p>
              <div className="modal-btn-grp">
                <button className="btn btn-delete" onClick={closeModal}>
                  Cancel
                </button>
                <button className="btn" onClick={action}>
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default Modal;
/**
 * <div
      className={`${
        isModalOpen ? "modal-overlay show-modal" : "modal-overlay"
      }`}
    >
      <div className="modal-container">
        <button className="close-modal-btn" onClick={closeModal}>
          <FaTimes></FaTimes>
        </button>
        <div className="modal-body">
          <h3>{header}</h3>
          <p>{message}</p>
          <div className="modal-btn-grp">
            <button className="btn btn-delete" onClick={closeModal}>
              Cancel
            </button>
            <button className="btn" onClick={action}>
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
 */
