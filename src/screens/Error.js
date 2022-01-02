import React from "react";
import { useHistory, Link } from "react-router-dom";
function Error() {
  const history = useHistory();
  const goBack = () => {
    history.goBack();
  };
  return (
    <section className="section">
      <section className="section-center">
        <div className="error-page">
          <h1>Oops!</h1>
          <h3>404 - Page Not Found</h3>
          <p>
            The page you are looking for might have been removed, had its name
            changed or does not exist.
          </p>

          <button className="btn" onClick={goBack}>
            Go Back
          </button>
          <Link to="/">
            <button className="btn btns">Homepage</button>
          </Link>
        </div>
      </section>
    </section>
  );
}

export default Error;
