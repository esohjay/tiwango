import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useGlobalContext } from "../context/store";
import { usePostActions } from "../actions/postActions";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useHistory } from "react-router-dom";
import BackButton from "../components/BackButton";
import { useFormik } from "formik";
import * as Yup from "yup";
//import { UPDATE_POST_RESET } from "../constants/post";
//import draftToHtml from "draftjs-to-html";
import Loader from "../components/Loader";
import Notification from "../components/Notification";
function EditPost(props) {
  const id = props.match.params.id;
  const history = useHistory();
  // const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  // const [newTags, setNewTags] = useState("");

  //const [category, setCategory] = useState("");
  const [isDraft, setIsDraft] = useState(false);
  const [description, setDescription] = useState(EditorState.createEmpty());
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [imageUploaded, setImageUploaded] = useState({});
  const [image, setImage] = useState({});
  const [imageToDelete, setImageToDelete] = useState("");
  const [errorUpload, setErrorUpload] = useState("");
  const [isErrorUpload, setIsErrorUpload] = useState(false);
  const { state } = useGlobalContext();
  const { loading, post, editedPost, error } = state;

  const { editPost, getPostDetails } = usePostActions();

  const uploadedImages = [];

  useEffect(() => {
    if (!id || !post || id !== post._id) {
      getPostDetails(id);
    } else {
      setImage(post?.image);
      setTags(post?.tags);

      setIsDraft(post?.isDraft);
      const contentState = convertFromRaw(post?.description);
      const editorState = EditorState.createWithContent(contentState);
      setDescription(editorState);
    }
  }, [editedPost, getPostDetails, id, post]);
  /* useEffect(() => {
    if (!id || !post || id !== post._id) {
      getPostDetails(id);
    } else {
      setImage(post?.image);
      setTags(post?.tags);

      setIsDraft(post?.isDraft);
      const contentState = convertFromRaw(post?.description);
      const editorState = EditorState.createWithContent(contentState);
      setDescription(editorState);
    }
  }, [post, id]);*/

  //console.log(wantedTags);
  // console.log(post?.title.valueOf());
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
      setImageToDelete(post.image.filename);
      setImage(data);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
      setIsErrorUpload(true);
    }
  };
  //console.log(post);
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
      setLoadingUpload(false);
      setIsErrorUpload(true);
    }
  };
  const wantedTags = [...tags];

  const removeTags = (checked, tag) => {
    if (!checked && !wantedTags.includes(tag)) {
      wantedTags.push(tag);
    } else if (checked && wantedTags.includes(tag)) {
      const idx = wantedTags.indexOf(tag);
      wantedTags.splice(idx, 1);
    }
  };
  /*const handleSubmit = (e) => {
    e.preventDefault();

    editPost(
      {
        id,
        title,
        category,
        image,

        newTags,
        isDraft,
        wantedTags,
        postImages: imageUploaded,
        description: convertToRaw(description.getCurrentContent()),
        imageToDelete,
      },
      history
    );
  };*/
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: post?.title,
      category: post?.category,
      newTags: "",
      postDate: post?.postDate,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Enter post title"),
      category: Yup.string().required("Select category"),
      newTags: Yup.string(),
      postDate: Yup.date().required("Select date"),
    }),
    onSubmit: (values) => {
      editPost(
        {
          ...values,
          image,
          isDraft,
          postImages: imageUploaded,
          description: convertToRaw(description.getCurrentContent()),
          id,
          wantedTags,
          imageToDelete,
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
          {isDraft ? (
            <>
              <h3>Continue Writing Post</h3>
            </>
          ) : (
            <>
              <h3>Edit Post</h3>
            </>
          )}

          {loading && <Loader size={30} loading={loading} />}
          {errorUpload && (
            <Notification
              message={errorUpload}
              success={false}
              show={isErrorUpload}
            />
          )}

          {post && (
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

                    <option value="Agriculture">Agriculture</option>
                    <option value="Technology">Technology</option>
                  </select>
                </div>
                {formik.touched.category && formik.errors.category ? (
                  <div className="delete">{formik.errors.category}</div>
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
                <label htmlFor="newTags">Add more tags</label>
                <input
                  type="text"
                  name="newTags"
                  id="newTags"
                  className="form-input"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.newTags}
                />
                <em>Separate each tag with space</em>
                {formik.touched.newTags && formik.errors.newTags ? (
                  <div className="delete">{formik.errors.newTags}</div>
                ) : null}
              </div>

              <div className="tag-container">
                <h4>Tick Tags You Wish To Remove</h4>
                <div className="tags">
                  {tags?.map((tag, i) => (
                    <div key={`${tag}${i}`} className="tag">
                      <input
                        type="checkbox"
                        onChange={(e) => removeTags(e.target.checked, tag)}
                      ></input>
                      <p>{tag}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="form-control">
                <label htmlFor="image">Change Display Image</label>
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
                  editorStyle={{ height: "300px", padding: "10px" }}
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
              <button
                onClick={() => setIsDraft(true)}
                type="submit"
                className="btn buttons"
              >
                Save
              </button>
              <button
                onClick={() => setIsDraft(false)}
                type="submit"
                className="btn"
              >
                Publish
              </button>
            </form>
          )}
        </div>
      </section>
    </section>
  );
}

export default EditPost;
