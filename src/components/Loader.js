import React from "react";
import { css } from "@emotion/react";
import HashLoader from "react-spinners/HashLoader";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
function Loader({ loading, text = "Please wait", size = 25 }) {
  return (
    <div className="loader">
      <HashLoader
        color={"#005c00"}
        loading={loading}
        css={override}
        size={size}
      />
      <p>{text}</p>
    </div>
  );
}

export default Loader;
