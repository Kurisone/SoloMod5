//App.jsx

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation'
import { restoreUser }from './store/session';
import SpotsPage from './components/Spots/SpotsPage'; 
import SpotDetails from './components/Spots/SpotDetails';
// import HomePage from './components/HomePage/HomePage';
import CurrentUserSpots from './components/Spots/CurrentUserSpots';
import EditSpotForm from './components/Spots/EditSpotForm';
import Auth from './components/AuthReq/Auth';
import CreateASpot from './components/Spots/CreateSpot';
import HomePage from './HomePage/HomePage';
import SpotReviews from './components/Reviews/SpotReviews';



// App component
// This component sets up the main layout of the application
// It uses React Router to manage the routing of the application
// It uses Redux to manage the state of the application
// It includes a Navigation component that displays the navigation bar
// It includes a Layout component that wraps the main content of the application
// It includes a RouterProvider that sets up the routing for the application
function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
    </>
  );
}
// The router configuration
// It defines the routes for the application
// It uses the createBrowserRouter function from react-router-dom to create a router
// It defines the main layout of the application
// It defines the child routes for the application
// It includes the main page, spot details page, create spot page, current user spots page, and edit spot page
// It uses the Auth component to protect certain routes that require authentication
const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: (
        <HomePage>
          <SpotsPage /> 
        </HomePage>
        )
      },
      {
        path: '/spots/:spotId',
        element: (
          <SpotDetails /> 
        )
      },
      {
        path: '/spots/new', 
        element: (
          <Auth> 
            <CreateASpot />
          </Auth>
        ),
      },
      {
        path: '/spots/current', 
        element: (
          <Auth>
            <CurrentUserSpots />
          </Auth>
        )

      },
      {
        path: '/spots/:spotId/edit',
        element: (
          <Auth>
            <EditSpotForm />
          </Auth>
        )
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;