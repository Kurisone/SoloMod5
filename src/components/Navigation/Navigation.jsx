import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import SignupFormModal from '../SignupFormModal/SignupFormModal';
import './Navigation.css';

// Navigation component
// This component displays the navigation bar of the application
// It uses the NavLink component from react-router-dom to create navigation links
// It uses the useSelector hook to get the session user from the Redux store
// It conditionally renders the login and signup buttons if the user is not logged in
// It conditionally renders the profile button if the user is logged in
// It uses the isLoaded prop to determine if the session user has been loaded
// It uses the className prop to apply styles to the navigation links
// It uses the end prop to specify that the home link should only be active when the path is exactly "/"
// It uses the buttonClass prop to apply styles to the login and signup buttons
// It uses the buttonText prop to specify the text for the login and signup buttons
// It uses the modalComponent prop to specify the modal component to be displayed when the button is clicked
// It uses the user prop to pass the session user to the ProfileButton component
function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state?.session?.user ?? null);

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
          <NavLink 
            to="/" 
            end 
            className={({ isActive }) => 
              `nav-link ${isActive ? 'active' : ''}`
            }
          >
            <i className="fas fa-home" /> Home
          </NavLink>
        </li>
        {isLoaded && sessionLinks !== undefined && sessionLinks}
      </ul>
    </nav>
  );
}

export default Navigation;