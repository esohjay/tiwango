import React, { useEffect } from "react";

import { useUserContext } from "../context/userContext";

import { useUserActions } from "../actions/userActions";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useHistory, Link } from "react-router-dom";
import BackButton from "../components/BackButton";
function AddPost() {
  //const [info, setInfo] = useState("");

  // const [password, setPassword] = useState("");

  const { state } = useUserContext();
  const { loading, success, userInfo, error } = state;
  const history = useHistory();
  const { signinUser } = useUserActions();

  /*const handleSubmit = (e) => {
    e.preventDefault();

    signinUser({ password, info });
  };*/
  useEffect(() => {
    if (userInfo) {
      history.goBack();
    }
  });
  const formik = useFormik({
    initialValues: {
      info: "",
      password: "",
    },
    validationSchema: Yup.object({
      info: Yup.string().required("Enter username or email"),

      password: Yup.string().required("Enter your password"),
    }),
    onSubmit: (values) => {
      signinUser(values);
    },
  });

  return (
    <section className="section">
      <BackButton history={history} />
      {error && <p className="error-message">{error}</p>}
      <section className="section-center">
        <div className="form-section">
          <h3>Sign In</h3>
          {loading && <h3>...Loading</h3>}
          {success && <h3>Signed in</h3>}
          <form className="form-body" onSubmit={formik.handleSubmit}>
            <div className="form-control">
              <label htmlFor="info">Username/Email</label>
              <input
                type="text"
                name="info"
                id="info"
                className="form-input-mini"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.info}
              />
              {formik.touched.info && formik.errors.info ? (
                <div className="delete">{formik.errors.info}</div>
              ) : null}
            </div>
            <div className="form-control">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                className="form-input-mini"
                id="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="delete">{formik.errors.password}</div>
              ) : null}
            </div>
            <p>
              Don't have an account? <Link to="/register"> Register</Link>
            </p>
            <button className="btn" type="submit">
              login
            </button>
          </form>
        </div>
      </section>
    </section>
  );
}

export default AddPost;
