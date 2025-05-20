import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import * as sessionActions from "../../store/session";
import OpenModalButton from "../OpenModalButton/OpenModalButton";
import LoginFormModal from "../LoginFormModal/LoginFormModal";
import SignupFormModal from "../SignupFormModal/SignupFormModal";
import { NavLink } from "react-router-dom";
import "./ProfileButton.css";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const toggleMenu = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
  };

  const ulClassName = `profile-dropdown ${showMenu ? "" : "hidden"}`;

  const getUserInitial = () => {
    if (!user?.firstName) return null;
    return user.firstName.charAt(0).toUpperCase();
  };

  return (
    <div className="profile-container">
      <button onClick={toggleMenu} className="profile-btn">
        <div className="profile-icon-container">
          <img
            className="profile-hamburger"
            alt="menu"
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciICB2aWV3Qm94PSIwIDAgNTAgNTAiIHdpZHRoPSI1MHB4IiBoZWlnaHQ9IjUwcHgiPjxwYXRoIGQ9Ik0gMCA3LjUgTCAwIDEyLjUgTCA1MCAxMi41IEwgNTAgNy41IFogTSAwIDIyLjUgTCAwIDI3LjUgTCA1MCAyNy41IEwgNTAgMjIuNSBaIE0gMCAzNy41IEwgMCA0Mi41IEwgNTAgNDIuNSBMIDUwIDM3LjUgWiIvPjwvc3ZnPg=="
          />
          {user ? (
            <div className="user-letter">
              {getUserInitial() || <FaUserCircle className="user-icon" />}
            </div>
          ) : (
            <FaUserCircle className="user-icon" />
          )}
        </div>
      </button>

      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li className="dropdown-item user-info">
              <div>Hello, {user.firstName || 'User'}</div>
              {user.email && <div className="user-email">{user.email}</div>}
            </li>
            <li className="dropdown-item">
              <NavLink
                to="/spots/current"
                className="manage-spots-link"
                onClick={closeMenu}
              >
                Manage Spots
              </NavLink>
            </li>
            <li className="dropdown-item">
              <button onClick={logout} className="logout-btn">
                Log Out
              </button>
            </li>
          </>
        ) : (
          <>
            <li className="dropdown-item">
              <OpenModalButton
                buttonText="Log In"
                modalComponent={<LoginFormModal />}
                onButtonClick={closeMenu}
                buttonClass="dropdown-auth-btn"
              />
            </li>
            <li className="dropdown-item">
              <OpenModalButton
                buttonText="Sign Up"
                modalComponent={<SignupFormModal />}
                onButtonClick={closeMenu}
                buttonClass="dropdown-auth-btn"
              />
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default ProfileButton;