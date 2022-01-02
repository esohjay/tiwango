import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useUserContext } from "../context/userContext";
import { useUserActions } from "../actions/userActions";
import Loader from "../components/Loader";
import Notification from "../components/Notification";
import { useHistory } from "react-router-dom";
import BackButton from "../components/BackButton";
function UpdateUser(props) {
  const id = props.match.params.id;
  const history = useHistory();
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [twitter, setTwitter] = useState("");
  const [bio, setBio] = useState("");
  const [isErrorUpload, setIsErrorUpload] = useState(false);
  const [whatsapp, setWhatsapp] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [location, setLocation] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [username, setUsername] = useState("");
  //const [password, setPassword] = useState("");
  //const [confirmPassword, setConfirmPassword] = useState("");
  const [loadingUpload, setLoadingUpload] = useState(false);

  const [image, setImage] = useState({});

  const [errorUpload, setErrorUpload] = useState("");
  const { state } = useUserContext();
  const { loading, updatedUser, user, error } = state;

  const { updateUser, getUserDetails } = useUserActions();

  useEffect(() => {
    if (!user || id !== user._id) {
      getUserDetails(id);
    } else if (user) {
      setFullname(user.fullname);
      setEmail(user.email);
      setUsername(user.username);
      setImage(user.image);
      setBio(user.bio);
      setTwitter(user.socials?.twitter);
      setFacebook(user.socials?.facebook);
      setLinkedIn(user.socials?.linkedIn);
      setInstagram(user.socials?.instagram);
      setWhatsapp(user.socials?.whatsapp);
      setLocation(user.location);
    }
  }, [updatedUser, user, id, getUserDetails]);

  const uploadFileHandler = async (e) => {
    const files = e.target.files[0];

    const bodyFormData = new FormData();

    bodyFormData.append("file", files);

    setLoadingUpload(true);
    try {
      const { data } = await Axios.post(
        `${process.env.REACT_APP_URL}/api/posts/upload`,
        bodyFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setLoadingUpload(false);

      setImage(data);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
      setIsErrorUpload(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const socials = {
      facebook,
      instagram,
      twitter,
      whatsapp,
      linkedIn,
    };
    updateUser(
      {
        id,
        email,
        location,
        bio,
        fullname,
        username,
        image,

        socials,
      },
      history
    );
  };

  return (
    <section className="section">
      {error && <p className="error-message">{error}</p>}
      <BackButton history={history} />
      {loading && <Loader size={30} loading={loading} />}
      {errorUpload && (
        <Notification
          message={errorUpload}
          success={false}
          show={isErrorUpload}
        />
      )}
      <section className="section-center">
        <div className="form-section">
          <h3>Update Profile</h3>
          {loading && <h3>...Loading</h3>}
          {updatedUser && <h3>Updated</h3>}
          <form className="form-body" onSubmit={handleSubmit}>
            <div className="form-control">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                className="form-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label htmlFor="fullname">Fullname</label>
              <input
                type="text"
                name="fullname"
                id="fullname"
                className="form-input"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label htmlFor="fullname">Location</label>
              <input
                type="text"
                name="fullname"
                id="fullname"
                className="form-input"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label htmlFor="bio">Bio</label>
              <textarea
                type="text"
                name="bio"
                id="bio"
                className="form-input"
                placeholder="A short bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>

            <div className="form-control">
              <label htmlFor="facebook">Facebook</label>
              <input
                type="text"
                name="facebook"
                id="facebook"
                placeholder="your facebook id"
                className="form-input"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label htmlFor="twitter">Twitter</label>
              <input
                type="text"
                name="twitter"
                id="twitter"
                className="form-input"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label htmlFor="whatsapp">Whatsapp</label>
              <input
                type="text"
                name="whatsapp"
                id="whatsapp"
                placeholder="e.g 181000000"
                className="form-input"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label htmlFor="instagram">Instagram</label>
              <input
                type="text"
                name="instagram"
                placeholder="e.g smith123"
                id="instagram"
                className="form-input"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label htmlFor="linkedin">Linkedin</label>
              <input
                type="text"
                name="linkedin"
                placeholder="your linkedin profile link"
                id="linkedin"
                className="form-input"
                value={linkedIn}
                onChange={(e) => setLinkedIn(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label htmlFor="image">Change Photo</label>
              <input
                color="blue.700"
                type="file"
                placeholder="Upload Image"
                className="form-input"
                onChange={uploadFileHandler}
              />
            </div>
            {loadingUpload && (
              <Loader
                size={25}
                text="Uploading Image"
                loading={loadingUpload}
              />
            )}
            <button className="btn-block btn">Update Profile</button>
          </form>
        </div>
      </section>
    </section>
  );
}

export default UpdateUser;
