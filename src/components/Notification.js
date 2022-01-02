import React, { useState, useEffect } from "react";

import { FaTimes } from "react-icons/fa";
const Notification = ({ message, success = false, show }) => {
  const [showMessage, setShowMessage] = useState(true);
  const closeMessage = () => {
    setShowMessage(false);
  };

  useEffect(() => {
    setShowMessage(true);
  }, [show]);
  return (
    <div
      className={`${
        showMessage && show
          ? "notification-overlay show-notification"
          : "notification-overlay"
      }`}
    >
      <p
        className={`${success ? "success-notification" : "error-notification"}`}
      >
        {message}
      </p>
      <button className="close-notification-btn" onClick={closeMessage}>
        <FaTimes></FaTimes>
      </button>
    </div>
  );
};

export default Notification;
