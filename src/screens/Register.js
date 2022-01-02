import React, { useEffect } from "react";
import { useUserContext } from "../context/userContext";
import { useUserActions } from "../actions/userActions";
import { useHistory, Link } from "react-router-dom";
import Loader from "../components/Loader";
import { useFormik } from "formik";
import * as Yup from "yup";
import BackButton from "../components/BackButton";
function Register(props) {
  /*const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState(false);
  const [fullname, setFullname] = useState("");*/
  const { state } = useUserContext();
  const { loading, success, userInfo, error } = state;
  const history = useHistory();
  const { createUser } = useUserActions();

  /*const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorPassword(true);
    } else {
      createUser({ password, fullname, username, email });
    }
  };*/
  useEffect(() => {
    if (userInfo) {
      history.push(`/user/${userInfo._id}`);
    }
  });
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      fullname: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      fullname: Yup.string().required("Enter fullname"),
      username: Yup.string()
        .max(15, "Must be 20 characters or less")
        .required("Enter username"),
      password: Yup.string()
        .min(4, "Must be 4 characters or more")
        .required("Enter your password"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Enter email address"),
      confirmPassword: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Password do not match"
      ),
    }),
    onSubmit: (values) => {
      createUser(values);
    },
  });

  return (
    <section className="section">
      {error && <p className="error-message">{error}</p>}
      <BackButton history={history} />
      {loading && <Loader loading={loading} />}
      <section className="section-center">
        <div className="form-section">
          {loading && <h3>...Loading</h3>}
          {success && <h3>Welcome</h3>}
          <form className="form-body" onSubmit={formik.handleSubmit}>
            <div className="form-control">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="e.g Smith"
                className="form-input-mini"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
              />
              {formik.touched.username && formik.errors.username ? (
                <div className="delete">{formik.errors.username}</div>
              ) : null}
            </div>
            <div className="form-control">
              <label htmlFor="fullname">FullName</label>
              <input
                type="text"
                name="fullname"
                className="form-input-mini"
                id="fullname"
                placeholder="e.g Martin Jack"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fullname}
              />
              {formik.touched.fullname && formik.errors.fullname ? (
                <div className="delete">{formik.errors.fullname}</div>
              ) : null}
            </div>
            <div className="form-control">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                className="form-input-mini"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="delete">{formik.errors.email}</div>
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

            <div className="form-control">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                className="form-input-mini"
                id="confirmPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
              />
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <div className="delete">{formik.errors.confirmPassword}</div>
              ) : null}
            </div>
            <p>
              Already have an account? <Link to="/signin"> Login</Link>
            </p>
            <button className="btn" type="submit">
              Register
            </button>
          </form>
        </div>
      </section>
    </section>
  );
}

export default Register;
