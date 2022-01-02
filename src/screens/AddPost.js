import React, { useState } from "react";
import Axios from "axios";
import { useGlobalContext } from "../context/store";
import { usePostActions } from "../actions/postActions";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import BackButton from "../components/BackButton";
import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Loader from "../components/Loader";
import Notification from "../components/Notification";
function AddPost() {
  const history = useHistory();
  //const [title, setTitle] = useState("");
  //  const [category, setCategory] = useState("");

  const [isDraft, setIsDraft] = useState(false);
  // const [tags, setTags] = useState("");
  const [description, setDescription] = useState(EditorState.createEmpty());
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [imageUploaded, setImageUploaded] = useState({});
  const [image, setImage] = useState({});
  const [errorUpload, setErrorUpload] = useState("");
  const [isErrorUpload, setIsErrorUpload] = useState(false);
  const { state } = useGlobalContext();
  const { loading, error } = state;

  const { createPost } = usePostActions();

  const uploadedImages = [];

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
      uploadedImages.push(data);
      setLoadingUpload(false);
      setImageUploaded(uploadedImages);
      setImage(data);
    } catch (error) {
      setErrorUpload(error.message);
      setIsErrorUpload(true);
      setLoadingUpload(false);
    }
  };

  const uploadCallback = async (file) => {
    const bodyFormData = new FormData();

    bodyFormData.append("file", file);

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
      uploadedImages.push(data);
      setLoadingUpload(false);
      setImageUploaded(uploadedImages);
      return { data: { link: data.url } };
    } catch (error) {
      setErrorUpload(error.message);
      setIsErrorUpload(true);
      setLoadingUpload(false);
    }
  };

  /*const handleSubmit = (e) => {
    e.preventDefault();

    createPost(
      {
        title,
        tags,
        category,
        image,
        isDraft,
        //isPublished,
        postImages: imageUploaded,
        description: convertToRaw(description.getCurrentContent()),
      },
      history
    );
  };*/

  const formik = useFormik({
    initialValues: {
      title: "",
      category: "",
      tags: "",
      postDate: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Enter post title"),
      category: Yup.string().required("Select category"),
      tags: Yup.string().required("Enter related tags"),
      postDate: Yup.date().required("Select date"),
    }),
    onSubmit: (values) => {
      createPost(
        {
          ...values,
          image,
          isDraft,
          postImages: imageUploaded,
          description: convertToRaw(description.getCurrentContent()),
        },
        history
      );
    },
  });

  return (
    <section className="section">
      {error && <p className="error-message">{error}</p>}
      <BackButton history={history} />
      <section className="section-center">
        <div className="form-section">
          <h3>Add Post</h3>
          {loading && <Loader size={30} loading={loading} />}
          {errorUpload && (
            <Notification
              message={errorUpload}
              success={false}
              show={isErrorUpload}
            />
          )}
          <form className="form-body" onSubmit={formik.handleSubmit}>
            <div className="form-control">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                className="form-input"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
              />
              {formik.touched.title && formik.errors.title ? (
                <div className="delete">{formik.errors.title}</div>
              ) : null}
            </div>

            <div className="form-control">
              <label htmlFor="category">Category</label>
              <div>
                <select
                  id="category"
                  name="category"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="form-input"
                >
                  <option value="">Choose Category</option>
                  <option value="General">General</option>
                  <option value="Health">Health</option>
                  <option value="Finance">Finance</option>
                  <option value="Self Development">Self Development</option>
                  <option value="Agriculture">Agriculture</option>
                  <option value="Technology">Technology</option>
                </select>
              </div>
              {formik.touched.category && formik.errors.category ? (
                <div className="delete">{formik.errors.category}</div>
              ) : null}
            </div>
            <div className="form-control">
              <label htmlFor="tags">Tags</label>
              <input
                type="text"
                name="tags"
                id="tags"
                className="form-input"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.tags}
              />
              <em>Separate each tag with space</em>
              {formik.touched.tags && formik.errors.tags ? (
                <div className="delete">{formik.errors.tags}</div>
              ) : null}
            </div>
            <div className="form-control">
              <label htmlFor="tags">Post Date</label>
              <input
                type="date"
                name="postDate"
                id="date"
                className="form-input"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.postDate}
              />

              {formik.touched.postDate && formik.errors.postDate ? (
                <div className="delete">{formik.errors.postDate}</div>
              ) : null}
            </div>

            <div className="form-control">
              <label htmlFor="image">Display Image</label>
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
            <div className="form-control">
              <label htmlFor="post">Write Post</label>
              <Editor
                editorState={description}
                onEditorStateChange={(editorState) =>
                  setDescription(editorState)
                }
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
                wrapperStyle={{
                  border: "2px solid green",
                  marginBottom: "20px",
                }}
                editorStyle={{ height: "500px", padding: "10px" }}
                toolbar={{
                  image: {
                    uploadCallback,
                    previewImage: true,
                    defaultSize: {
                      height: "150px",
                      width: "150px",
                    },
                  },
                }}
                placeholder="Compose your post"
              />
            </div>
            <div className="buttons">
              <button
                type="submit"
                onClick={() => setIsDraft(true)}
                className="btn buttons"
              >
                Save
              </button>
              <button className="btn" type="submit">
                Publish
              </button>
            </div>
          </form>
        </div>
      </section>
    </section>
  );
}

export default AddPost;
