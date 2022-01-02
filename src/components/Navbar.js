import React, { useState, useRef, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { links } from "../data";
import { useUserContext } from "../context/userContext";
import { useGlobalContext } from "../context/store";
import Category from "../components/Category";
import AdminDropdown from "../components/AdminDropdown";
import { Link } from "react-router-dom";
import { useUserActions } from "../actions/userActions";
const Navbar = (props) => {
  const [showLinks, setShowLinks] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAdminDropdown, setShowAdminDropdown] = useState(false);
  const { signout } = useUserActions();
  const { state: postState } = useGlobalContext();
  const { state } = useUserContext();
  const { userInfo } = state;
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);
  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  useEffect(() => {
    const linksHeight = linksRef.current.getBoundingClientRect().height;
    if (showLinks) {
      linksContainerRef.current.style.height = `${linksHeight}px`;
    } else {
      linksContainerRef.current.style.height = "0px";
    }
  }, [showLinks, showDropdown, showAdminDropdown]);
  useEffect(() => {
    linksContainerRef.current.style.height = "0px";
  }, [state.loading, postState.loading]);
  return (
    <div>
      <nav>
        <div className="nav-center">
          <div className="nav-header">
            <h4>
              <Link to="/">Tiwango</Link>
            </h4>
            <button className="nav-toggle" onClick={toggleLinks}>
              <FaBars />
            </button>
          </div>

          <div className="links-container" ref={linksContainerRef}>
            <div className="">
              <ul className="navbar-links-container" ref={linksRef}>
                <div className="links ">
                  {links.map((link) => {
                    const { id, url, text } = link;
                    return (
                      <div key={id}>
                        {text === "category" ? (
                          <li
                            className="link"
                            key={id}
                            onClick={() => setShowDropdown(!showDropdown)}
                          >
                            <Link to={url}>{text}</Link>
                            <Category show={showDropdown} text={text} />
                          </li>
                        ) : (
                          <li className="link" key={id}>
                            <Link to={url}>{text}</Link>
                          </li>
                        )}
                      </div>
                    );
                  })}
                  {userInfo && userInfo.isAdmin && (
                    <li
                      className="link"
                      onClick={() => setShowAdminDropdown(!showAdminDropdown)}
                    >
                      <Link to="#">Admin</Link>
                      <AdminDropdown show={showAdminDropdown} />
                    </li>
                  )}
                  {userInfo && (
                    <li>
                      <Link to={`/user/${userInfo?._id}`}>Dashboard</Link>
                    </li>
                  )}
                </div>
                <ul className="links">
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
                </ul>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
/** 
 * 
 * <div className="nav-center">
        <div className="nav-header">
          <h4>
            <Link to="/">Agritalk</Link>
          </h4>
          <button className="nav-toggle" onClick={toggleLinks}>
            <FaBars />
          </button>
        </div>
        <div className="links-containe " ref={linksContainerRef}>
          <ul className="navbar-container" ref={linksRef}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/">About</Link>
            </li>
            <li onClick={() => setShowDropdown(!showDropdown)}>
              <Link to="/">Category</Link>
              <ul
                className={showDropdown ? "dropdown show-dropdown" : "dropdown"}
              >
                <li>
                  <Link to="/">Marketing</Link>
                </li>
                <li>
                  <Link to="/">Finance</Link>
                </li>
                <li>
                  <Link to="/">News</Link>
                </li>
                <li>
                  <Link to="/">Marketing</Link>
                </li>
                <li>
                  <Link to="/">Finance</Link>
                </li>
                <li>
                  <Link to="/">News</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </div>
      </div>
 * 
 * 
 * 
 * <div>
        <nav>
          <div className="nav-center">
            <div className="nav-header">
              <h4>
                <Link to="/">Agritalk</Link>
              </h4>
              <button className="nav-toggle" onClick={toggleLinks}>
                <FaBars />
              </button>
            </div>
            <div className="links-container" ref={linksContainerRef}>
              <ul className="navbar-container" ref={linksRef}>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/">About</Link>
                </li>
                <li onClick={() => setShowDropdown(!showDropdown)}>
                  <Link to="/">Category</Link>
                  <ul
                    className={
                      showDropdown ? "dropdown show-dropdown" : "dropdown"
                    }
                  >
                    <li>
                      <Link to="/">Marketing</Link>
                    </li>
                    <li>
                      <Link to="/">Finance</Link>
                    </li>
                    <li>
                      <Link to="/">News</Link>
                    </li>
                    <li>
                      <Link to="/">Marketing</Link>
                    </li>
                    <li>
                      <Link to="/">Finance</Link>
                    </li>
                    <li>
                      <Link to="/">News</Link>
                    </li>
                  </ul>
                </li>
                <li>
                  <Link to="/">Home</Link>
                </li>
              </ul>
            </div>
            <ul className="social-icons">
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
            </ul>
          </div>
        </nav>
      </div>
 * 
<div>
      <nav>
        <div className="nav-center">
          <div className="nav-header">
            <h4>
              <Link to="/">Agritalk</Link>
            </h4>
            <button className="nav-toggle" onClick={toggleLinks}>
              <FaBars />
            </button>
          </div>
          <div className="links-container" ref={linksContainerRef}>
            <ul className="links" ref={linksRef}>
              <li
                className="link"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <Link to="">Category</Link>
                {showDropdown && (
                  <ul className="dropdwon">
                    <li>
                      <Link to="">Marketing</Link>
                    </li>
                    <li>
                      <Link to="">Finance</Link>
                    </li>
                    <li>
                      <Link to="">News</Link>
                    </li>
                  </ul>
                )}
              </li>
              {links.map((link) => {
                const { id, url, text } = link;
                return (
                  <li className="link" key={id}>
                    <Link to={url}>{text}</Link>
                  </li>
                );
              })}

              {userInfo && (
                <li>
                  <Link to={`/user/${userInfo?._id}`}>Dashboard</Link>
                </li>
              )}
            </ul>
          </div>
          <ul className="social-icons">
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
          </ul>
        </div>
      </nav>
    </div> 
    
    
    
    
    
    
   
    */
