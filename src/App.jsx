//App.jsx

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation'
import { restoreUser }from './store/session';
import SpotsPage from './components/Spots/SpotsPage'; 
import SpotDetails from './components/Spots/SpotDetails';
import HomePage from './components/HomePage/HomePage';
import CurrentUserSpots from './components/Spots/CurrentUserSpots';
import EditSpotForm from './components/Spots/EditSpotForm';
import Auth from './components/AuthReq/Auth';


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

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <SpotsPage /> //spot grid
      },
      {
        path: '/spots/:spotId',
        element: <SpotDetails /> //Spot Page
      },
      {
        path: '/spots/new', // Create new spot
        element: (
          <Auth> 
            <manage />
          </Auth>
        ),
      },
      {
        path: '/spots/current', 
        element: <CurrentUserSpots />

      },
      {
        path: '/spots/:spotId/edit',
        element: <EditSpotForm />
      }
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;