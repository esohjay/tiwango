import React from "react";
import { FaEnvelope } from "react-icons/fa";
//import { MdLocationPin } from "react-icons/md";
import { Link } from "react-router-dom";
import { useUserContext } from "../context/userContext";
import { useUserActions } from "../actions/userActions";
import { useFormik } from "formik";
import * as Yup from "yup";
import Notification from "../components/Notification";
function Footer() {
  /*const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");*/
  const { state } = useUserContext();
  const { userInfo, messageSent, error } = state;
  const { signout, contactUs } = useUserActions();
  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Enter your name"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Enter email address"),
      message: Yup.string().required("Enter your message"),
    }),
    onSubmit: (values, { resetForm }) => {
      contactUs(values);
      resetForm();
    },
  });

  /* const handleSubmit = (e) => {
    e.preventDefault();
    contactUs({ name, email, message });
  };*/

  return (
    <div>
      {error && <p className="error-message">{error}</p>}
      <Notification
        message={"Message sent. Thanks for contacting us"}
        success={true}
        show={messageSent}
      />
      <footer>
        <div className="content">
          <div className="left box">
            <div className="upper">
              <div className="topic">About us</div>
              <p>
                Tiwango is a leading online platform with great interest in
                research articles and blogposts that centres on diverse topics
                ranging from Finance, Home gardening, Tech and Health related
                topics. At Tiwango, our greatest strength lies in our diversity
                of interest.
              </p>
            </div>
            <div className="lower">
              <div className="topic">Contact Info</div>

              <div className="email">
                <>
                  <p>
                    <i>
                      <FaEnvelope />
                    </i>
                    tiwangohelpdesk@gmail.com
                  </p>
                </>
              </div>
            </div>
          </div>
          <div className="middle box">
            <div className="topic">Quick Links</div>
            <div className="footer-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/addpost">Add Post</Link>
              </li>
              {userInfo && (
                <li>
                  <Link to={`/user/${userInfo?._id}`}>Dashboard</Link>
                </li>
              )}
              {!userInfo ? (
                <>
                  <li>
                    <Link to={`/signin`}>Sign in</Link>
                  </li>
                  <li>
                    <Link to={`/register`}>Register</Link>
                  </li>
                </>
              ) : (
                <li>
                  <Link to="" onClick={() => signout()}>
                    Sign Out
                  </Link>
                </li>
              )}
            </div>
          </div>

          <div className="right box">
            <div className="topic">Contact us</div>
            <div>
              <form onSubmit={formik.handleSubmit}>
                <div className="form-control">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="form-input"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className="delete">{formik.errors.name}</div>
                  ) : null}
                </div>
                <div className="form-control">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="form-input"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="delete">{formik.errors.email}</div>
                  ) : null}
                </div>
                <div className="form-control">
                  <label htmlFor="message">Message</label>
                  <textarea
                    type="text"
                    name="message"
                    id="message"
                    className="form-input"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.message}
                  />
                  {formik.touched.message && formik.errors.message ? (
                    <div className="delete">{formik.errors.message}</div>
                  ) : null}
                </div>
                <button className="btn-block btn" type="submit">
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="bottom">
          <p>
            Copyright © 2021 <>Tiwango</> All rights reserved
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
