//frontend/src/components/Navigation/Navigation.jsx
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import SignupFormModal from '../SignupFormModal/SignupFormModal';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <li>
        <ProfileButton user={sessionUser} />
      </li>
    );
  } else {
    sessionLinks = (
      <>
        <li>
          <OpenModalButton
            buttonText="Log In"
            modalComponent={<LoginFormModal />}
            buttonClass="nav-login-button"
          />
        </li>
        <li>
          <OpenModalButton
            buttonText="Sign Up"
            modalComponent={<SignupFormModal />}
            buttonClass="nav-signup-button"
          />
        </li>
      </>
    );
  }

  return (
    <nav className="navigation-bar">
      <ul className="nav-links">
        <li className="nav-home">
          <NavLink to="/" exact className="nav-link">
            <i className="fas fa-home" /> Home
          </NavLink>
        </li>
        {isLoaded && sessionLinks}
      </ul>
    </nav>
  );
}

export default Navigation;