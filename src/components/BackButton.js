import React from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";
const BackButton = ({ history }) => {
  const goBack = () => {
    history.goBack();
  };
  return (
    <div className="back-btn-section">
      <button onClick={goBack} className=" back-btn">
        <FaArrowAltCircleLeft className="back-btn-icon" />
      </button>
    </div>
  );
};

export default BackButton;
