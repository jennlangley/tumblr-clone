import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from 'react-router-dom'
import { logout } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import './Navigation.css';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  const closeMenu = () => setShowMenu(false);

  return (
    <>
      <button className='profileButton' onClick={openMenu}>
        {/* <i className="fas fa-user-circle" /> */}
        <i id='profileIcon' className="fa-regular fa-user fa-lg" />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>Hi, {user.username}</li>
            <li><NavLink className='profile-link' to={`/users/${user.id}/posts`} onClick={closeMenu}>Your Posts</NavLink></li>
            <li><NavLink className='profile-link' to={`/users/${user.id}/comments`} onClick={closeMenu}>Your Comments</NavLink></li>
            <li><NavLink className='profile-link' to={`/users/${user.id}/likes`} onClick={closeMenu}>Your Likes</NavLink></li>
            <div className='buttonDiv'>
              <button className='buttonDesign' onClick={handleLogout}>Log Out</button>
            </div>
          </>
        ) : (
          <>
          <ul className='profile-dropdown'>
          <div className='dropdown-link'>
            <OpenModalButton
              buttonText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            </div>

            <div className='dropdown-link'><OpenModalButton
              buttonText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
            </div>
            </ul>
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
