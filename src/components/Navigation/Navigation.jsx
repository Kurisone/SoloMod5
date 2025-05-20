import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import SignupFormModal from '../SignupFormModal/SignupFormModal';
import logo from '../../assets/logo.png';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state?.session?.user ?? null);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <li className="nav-create-spot">
          <NavLink to="/spots/new" className="create-spot-link">
            Create a New Spot
          </NavLink>
        </li>
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      </>
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
      <div className="nav-left">
        <ul className="nav-links">
          <li className="nav-home">
            <NavLink to="/" end className="nav-link">
              <img src={logo} alt="Home" className="nav-logo" />
            </NavLink>
          </li>
        </ul>
      </div>
      
      <div className="nav-right">
        <ul className="nav-links">
          {isLoaded && sessionLinks}
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;