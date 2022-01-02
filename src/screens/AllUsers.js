import React, { useEffect, useState } from "react";
import { useUserContext } from "../context/userContext";
import { useUserActions } from "../actions/userActions";
import Pagination from "../components/Pagination";
import Modal from "../components/Modal";
import { FaRegTrashAlt, FaUserShield, FaUserAltSlash } from "react-icons/fa";
import { useHistory, Link } from "react-router-dom";
import BackButton from "../components/BackButton";
import Loader from "../components/Loader";
function AllPosts(props) {
  const history = useHistory();
  const { state } = useUserContext();
  const [isUserModal, setIsUserModal] = useState(false);
  const [isAdminModal, setIsAdminModal] = useState(false);
  const [search, setSearch] = useState("");
  const { users, loading, userDeleted, madeAdmin, error } = state;
  const [index, setIndex] = useState("");

  const { getAllUsers, changeAdminStatus, deleteUser } = useUserActions();
  useEffect(() => {
    setIsUserModal(false);
    setIsAdminModal(false);
    getAllUsers({});
  }, [userDeleted, madeAdmin, getAllUsers]);
  const openUserModal = (i) => {
    setIsUserModal(true);
    setIndex(i);
  };
  const closeUserModal = () => {
    setIsUserModal(false);
  };
  const openAdminModal = (i) => {
    setIsAdminModal(true);
    setIndex(i);
  };
  const closeAdminModal = () => {
    setIsAdminModal(false);
  };
  function handleSubmit(e) {
    e.preventDefault();
    getAllUsers({ search });
  }
  return (
    <div className="section">
      {error && <p className="error-message">{error}</p>}
      <BackButton history={history} />
      {loading && <Loader size={30} loading={loading} />}
      <section className="section search">
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="username">search for user</label>
            <input
              type="text"
              className="form-input"
              value={search}
              placeholder="username/email"
              id="username"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </form>
      </section>
      <div>
        <table className="table">
          <tbody>
            <tr>
              <th>User</th>
              <th>Admin</th>
              <th>Action</th>
            </tr>
            {users?.userList?.map((user, i) => (
              <tr key={user._id}>
                <td>
                  <Link to={`/user/${user._id}`}>{user.username}</Link>
                </td>
                <td>{user.isAdmin ? "Yes" : "No"}</td>
                <td>
                  <div className="post-options">
                    {user.isAdmin && (
                      <div className="post-options-icon like">
                        <FaUserAltSlash onClick={() => openAdminModal(i)} />
                      </div>
                    )}
                    {!user.isAdmin && (
                      <div className="post-options-icon like">
                        <FaUserShield onClick={() => openAdminModal(i)} />
                      </div>
                    )}
                    {i === index && (
                      <Modal
                        header="Change Status?"
                        message="This will change user's admin status"
                        action={() => changeAdminStatus(user._id)}
                        isModalOpen={isAdminModal}
                        closeModal={closeAdminModal}
                      />
                    )}
                    {i === index && (
                      <Modal
                        header="Delete?"
                        message="Post will be deleted permanently"
                        action={() => deleteUser(user._id)}
                        isModalOpen={isUserModal}
                        closeModal={closeUserModal}
                      />
                    )}
                    <div className="post-options-icon delete">
                      <FaRegTrashAlt onClick={() => openUserModal(i)} />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {users && (
        <Pagination
          pageInfo={{
            hasNextPage: users?.hasNextPage,
            hasPrevPage: users?.hasPrevPage,
            nextPage: users?.nextPage,
            prevPage: users?.prevPage,
            totalPosts: users?.totalPosts,
            totalPages: users?.totalPages,
            page: users?.page,
          }}
        />
      )}
    </div>
  );
}

export default AllPosts;
